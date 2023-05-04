<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> Datos de la Visita </h4>
            <form @submit="doSubmit($event)">
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Local </label>
                            <select class="form-control" v-model="form.local.id">
                                <option> </option>
                                <option v-for="local in locales" :value="local.id"> {{  local.local }}</option>
                            </select>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Fecha de Visita </label>
                            <input class="form-control" type="datetime-local" v-model="form.fecha" />
                        </div>                        
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Limpiador </label>
                            <select class="form-control" v-model="form.limpiador.id">
                                <option> </option>
                                <option v-for="user in usuarios" :value="user.id"> {{  user.name }}</option>
                            </select>
                        </div>                        
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> Checklist de la Visita </h4>
            <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Checklist</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in form.checkList" :key="index">
                            <td> {{ item.categoria }}</td>
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
import { ref, watch, reactive, onBeforeMount } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findVisita, newVisita, updateVisita}  from '@/services/visitas';
import {getAllLocales}  from '@/services/locales';
import {allByRol}  from '@/services/usuarios';


const title = 'Form de Visitas'

const breadcrumb = [
    {title: 'Visitas', active: false, link: '/visitas'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const id = ref( route.params.id || null );
const error = ref('');
const locales = ref([])
const usuarios = ref([])

const initialState = {
    id: '',
    local: '',
    limpiador: '',
    fecha: '',
    checkList: [],
};

const form = reactive({...initialState, checkList: []})

const onSearch = async () => {
    try {
        const { data } = await findVisita( id.value );
        form.id = id.value
        form.local = data.local
        form.fecha = data.fecha
        form.limpiador = data.attender
        form.checkList = data.checklist
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
            await updateVisita( form );
        } else {
            await newVisita( form );
        }
    } catch (err){
        error.value = err.message;
    }
}

const getUsers = async() => {
    try {
        const { data } = await allByRol( 4 );
        usuarios.value = data;
    } catch (err){
        error.value = err.message;
    }
}

const getLocales = async() => {
    try {
        const { data } = await getAllLocales();
        locales.value = data;
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

onBeforeMount( () => {
    getUsers();
    getLocales();
})

</script>
<style scoped>
i {
    font-size: 1rem;
}   
</style>