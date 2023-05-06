<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <form class="needs-validation" @submit="doSubmit($event)" novalidate
        :class="{'was-validated': v$.$invalid}"
    >
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"> Datos de la Visita </h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <div>
                                <label class="form-label"> Local </label>
                                <select class="form-control" v-model="form.local.id" required
                                    :class="{'border-danger': v$.local.$error}" 
                                >
                                    <option> - </option>
                                    <option v-for="local in locales" :value="local.id"> {{  local.local }}</option>
                                </select>
                                <div class="text-danger text-invalid" v-if="v$.local.$error">
                                        {{ v$.local.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Fecha de Visita </label>
                                <input class="form-control" type="datetime-local" v-model="form.fecha" required
                                    :class="{'border-danger': v$.fecha.$error}" 
                                >
                                <div class="text-danger text-invalid" v-if="v$.fecha.$error">
                                        {{ v$.fecha.$errors[0].$message }}
                                </div>
                            </div>                        
                        </div>
                        <div class="col-lg-6">
                            <div>
                                <label class="form-label"> Limpiador </label>
                                <select class="form-control" v-model="form.limpiador.id" required
                                    :class="{'border-danger': v$.local.$error}" 
                                >
                                    <option> - </option>
                                    <option v-for="user in usuarios" :value="user.id"> {{  user.name }}</option>
                                </select>
                                <div class="text-danger text-invalid" v-if="v$.local.$error">
                                        {{ v$.local.$errors[0].$message }}
                                </div>
                            </div>                        
                        </div>
                    </div>
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

            </div>
        </div>

        
        <div class="card">
            <div class="card-body">
                <div class="mt-3" v-if="!isLoading">
                    <button class="btn btn-primary" type="submit"> Guardar </button>
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
import Alerts from '@/composables/alerts';
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive, onBeforeMount } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findVisita, newVisita, updateVisita}  from '@/services/visitas';
import {getAllLocales}  from '@/services/locales';
import {allByRol}  from '@/services/usuarios';

import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'


const title = 'Form de Visitas'

const breadcrumb = [
    {title: 'Visitas', active: false, link: '/visitas'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const isLoading = ref( false );
const id = ref( route.params.id || null );
const error = ref('');
const locales = ref([])
const usuarios = ref([])

const initialState = {
    id: '',
    local: {
        id: ''
    },
    limpiador: {
        id: ''
    },
    fecha: '',
    latitud: '',
    longitud: '',
    checkList: [],
};

const form = reactive({...initialState, checkList: []})
const rules = {
    local: { 
        id: { required }
    },
    limpiador: { 
        id: { required }
    },
    fecha: { required },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onSearch = async () => {
    try {
        isLoading.value = true;
        const { data } = await findVisita( id.value );
        form.id = id.value
        form.local = data.local
        form.fecha = data.fecha
        form.latitud = data.latitud
        form.longitud = data.longitud
        form.limpiador = data.attender
        form.checkList = data.checklist
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}


if( id.value ) {
    onSearch()
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
            await updateVisita( form );
        } else {
            await newVisita( form );
        }
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const getUsers = async() => {
    try {
        isLoading.value = true;
        const { data } = await allByRol( 4 );
        usuarios.value = data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const getLocales = async() => {
    try {
        isLoading.value = true;
        const { data } = await getAllLocales();
        locales.value = data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
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