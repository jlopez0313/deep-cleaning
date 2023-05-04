<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> Datos del Local </h4>
            <form @submit="doSubmit($event)">
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Nombre </label>
                            <input class="form-control" v-model="form.local" />
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Ubicación </label>
                            <img :src="form.ubicacion" width="530" />
                        </div>                        
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Dirección </label>
                            <input class="form-control" v-model="form.direccion" />
                        </div>
                        <div  class="mt-3">
                            <label class="form-label"> Foto del Local </label>
                            <input class="form-control" type="file"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> Usuarios del Local </h4>
            <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.usuarios" :key="index">
                            <td> {{ item.name }}</td>
                            <td> 
                                <router-link :to="`locales/${item.id}`" title="Eliminar" class="btn btn-outline-secondary btn-sm"> <i class="mdi mdi-delete-outline"></i> </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="mt-3 d-flex">
                    <button class="ms-auto btn btn-primary"> Agregar </button>
                </div>
            </div>

            <div class="mt-3">
                <button class="btn btn-primary"> Guardar </button>
            </div>

        </div>        
    </div>
                    
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findLocal, newLocal, updateLocal}  from '@/services/locales';

const title = 'Form de Locales'

const breadcrumb = [
    {title: 'Locales', active: false, link: '/locales'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const error = ref('');
const id = ref( route.params.id || null );

const usuarios = []

const initialState = {
    id: '',
    local: '',
    direccion: '',
    ubicacion: 'https://media.wired.com/photos/59333e64714b881cb296a4d4/master/w_2560%2Cc_limit/Google-Maps-shot-of-San-Francisco.png',
    foto: '',
    usuarios: [...usuarios]
};

const form = reactive({...initialState, usuarios: [...usuarios]})

const onSearch = async() => {
    try {
        const { data } = await findLocal( id.value );
        form.id = id.value
        form.local = data.local
        form.direccion = data.direccion
        // form.ubicacion = 'https://media.wired.com/photos/59333e64714b881cb296a4d4/master/w_2560%2Cc_limit/Google-Maps-shot-of-San-Francisco.png'
        form.foto = ''
        form.usuarios = data.managers;
    } catch (err){
        error.value = err.message;
    }
}


if( id.value ) {
    onSearch()
}

const doSubmit = async (evt) => {
    evt.preventDefault();
    
    try {
        if ( id.value ) {
            await updateLocal( form );
        } else {
            await newLocal( form );
        }
    } catch (err){
        error.value = err.message;
    }
}

watch(
    () => route.params.id,
    async newId => {
        id.value = newId
        if ( newId ) {
            onSearch()
        } else {
            Object.assign(form, {...initialState})
        }
    }
)

</script>
<style scoped>
i {
    font-size: 1rem;
}
</style>