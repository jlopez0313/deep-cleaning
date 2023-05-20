<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <form class="needs-validation" @submit="doSubmit($event)" novalidate
        :class="{'was-validated': v$.$invalid}"
    >
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"> Datos del Local </h4>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mt-3">
                            <label class="form-label"> Nombre </label>
                            <input class="form-control" v-model="form.local" required
                                :class="{'border-danger': v$.local.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.local.$error">
                                    {{ v$.local.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Dirección </label>
                            <input class="form-control" v-model="form.direccion" required
                                :class="{'border-danger': v$.direccion.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.direccion.$error">
                                    {{ v$.direccion.$errors[0].$message }}
                            </div>
                        </div>                   
                    </div>
                    <div class="col-lg-6">
                        <div class="mt-3">
                            <label class="form-label"> Foto del Local </label>
                            <input class="form-control" type="file" accept="image/*"
                                @change="onFileChange"
                            >
                        </div>
                        <div class="mt-3">
                            <img class="foto" v-if="foto" :src="foto" />
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="mt-3">
                            <label class="form-label"> Ubicación </label>
                            <div :class="{'map-danger': v$.latitud.$error || v$.longitud.$error}" >
                                <Maps
                                    :key="form.id"
                                    :markers="markers"
                                    @onLatLng="onLatLng($event)"
                                ></Maps>
                            </div>

                            <div class="text-danger text-invalid" v-if="v$.latitud.$error || v$.longitud.$error">
                                    {{ v$.latitud.$errors[0].$message || v$.longitud.$errors[0].$message }}
                            </div>
                        </div>     
                    </div>
                </div>
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
                                <td>
                                    <div>
                                        <select class="form-control" v-model="item.id" required
                                            :class="{'border-danger': v$.usuarios.$errors[0]?.$message[ index ][0] }" 
                                        >
                                            <option value=""> - </option>
                                            <option v-for="user in usuarios" :value="user.id"> {{  user.name }}</option>
                                        </select>
                                        <div class="text-danger text-invalid" v-if="v$.usuarios.$errors[0]?.$message[ index ][0]">
                                                {{ v$.usuarios.$errors[0].$message[ index ][0] }}
                                        </div>
                                    </div>
                                </td>
                                <td> 
                                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="onRemoveUser( index )"> <i class="mdi mdi-delete-outline"></i> </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="mt-3 d-flex">
                        <button class="ms-auto btn btn-primary" type="button" @click="onAddUser()"> Agregar </button>
                    </div>
                </div>
            </div>   
        </div>

        <div class="card">
            <div class="card-body">
                <div class="mt-3" v-if="!isLoading">
                    <button class="btn btn-primary" type="submit">Guardar </button>
                </div>
                        
                <div class="mt-3" v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                    </div>
                </div>
            </div>        
        </div>

    </form>
                    
</template>

<script setup>
import { ref, watch, computed, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';
import Maps from '@/components/Maps.vue';

import {findLocal, newLocal, updateLocal}  from '@/services/locales';
import {allByRol}  from '@/services/usuarios';

import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { unique } from '@/helpers/validators';

const title = 'Locales'

const breadcrumb = [
    {title: 'Locales', active: false, link: '/locales'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const markers= ref([
    {
        lat: 27.95,
        lng: -82.47,
        draggable: true
    }
]);

const foto = ref('');
const usuarios = ref([]);
const isLoading = ref( false );
const localUsuarios = ref([]);
const id = ref( route.params.id || null );


const initialState = {
    id: '',
    local: '',
    direccion: '',
    latitud: '',
    longitud: '',
    foto: '',
    oldPhoto: '',
    usuarios: []
};

const form = reactive({...initialState})
const rules = {
    local: { required },
    direccion: { required },
    latitud: { required },
    longitud: { required },
    // foto: { required },
    usuarios: {
        $each: helpers.forEach({
            id: { required, unique: unique( computed(() => form.usuarios), 'id' ) }
        })
    }
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onAddUser = () => {
    form.usuarios.push({  id: '' })
}

const onRemoveUser = (key) => {
    form.usuarios.splice(key, 1);
}

const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data } = await findLocal( id.value );
        form.id = id.value
        form.local = data.local
        form.direccion = data.direccion
        form.latitud = data.latitud
        form.longitud = data.longitud

        data.usuarios.forEach( user => {
            form.usuarios.push({id: user.user_id});
        })
        
        if (data.foto)  {
            foto.value = `${import.meta.env.VITE_BASE_BACK}/${data.foto}`;
            form.oldPhoto = data.foto;
        }

        markers.value = [{
            lat: form.latitud,
            lng: form.longitud,
            draggable: true,                
            changeColor: false,
            title: form.local
        }]

    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const onLatLng = (latLng) => {
    form.latitud = latLng.lat;
    form.longitud = latLng.lng;
}

const getUsers = async() => {
    try {
        isLoading.value = true;
        const { data } = await allByRol([ 2, 5 ]);
        usuarios.value = data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const onFileChange = (e) => {
    form.foto = e.target.files[0];
    foto.value = URL.createObjectURL(form.foto);
}

const checkUnique = ( evt, key ) => {
    const found = form.usuarios.filter(item => item['id'] == evt.target.value)
    if ( found.length > 1 ) {
        
    }
}

const doSubmit = async (evt) => {
    evt.preventDefault();

    const valid = await v$.value.$validate()

    if ( !valid ) {
        return;
    }

    try {
        isLoading.value = true;
        if ( id.value ) {
            await updateLocal( form );
            Alerts.update();
        } else {
            await newLocal( form );
            Alerts.create();
        }

        router.push('/locales')
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

if( id.value ) {
    onSearch()
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
})

</script>
<style scoped>
i {
    font-size: 1rem;
}

.foto {
    max-height: 200px;
    max-width: 200px;
}
.map-danger {
    border: 1px solid #ff715b;
}
</style>