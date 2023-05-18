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
                            <div class="mt-3">
                                <label class="form-label"> Fecha de Visita </label>
                                <input class="form-control" type="date" v-model="form.fecha" required
                                    :class="{'border-danger': v$.fecha.$error}"
                                    :min="today"
                                >
                                <div class="text-danger text-invalid" v-if="v$.fecha.$error">
                                        {{ v$.fecha.$errors[0].$message }}
                                </div>
                            </div>                            
                            <div class="mt-3">
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
                        <div class="col-lg-6">
                            <div class="mt-3">
                                <label class="form-label"> Hora Inicial </label>
                                <input class="form-control" type="time" v-model="form.start_time" required
                                    :class="{'border-danger': v$.start_time.$error}" 
                                >
                                <div class="text-danger text-invalid" v-if="v$.start_time.$error">
                                        {{ v$.start_time.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Hora Final </label>
                                <input class="form-control" type="time" v-model="form.end_time" required
                                    :class="{'border-danger': v$.end_time.$error}" 
                                >
                                <div class="text-danger text-invalid" v-if="v$.end_time.$error">
                                        {{ v$.end_time.$errors[0].$message }}
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Estado </label>
                                <select class="form-control" v-model="form.estados_id" required
                                    :class="{'border-danger': v$.estados_id.$error}" 
                                >
                                    <option> - </option>
                                    <option v-for="estado in estados" :value="estado.id"> {{  estado.estado }}</option>
                                </select>
                                <div class="text-danger text-invalid" v-if="v$.local.$error">
                                        {{ v$.estados_id.$errors[0].$message }}
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
                                <td> 
                                    <div>
                                        <select class="form-control" v-model="item.categorias_id" required
                                            :class="{'border-danger': v$.checkList.$errors[0]?.$message[ index ][0] }" 
                                        >
                                            <option value=""> - </option>
                                            <option v-for="categoria in categorias" :value="categoria.id"> {{ categoria.categoria }}</option>
                                        </select>
                                        <div class="text-danger text-invalid" v-if="v$.checkList.$errors[0]?.$message[ index ][0]">
                                                {{ v$.checkList.$errors[0].$message[ index ][0] }}
                                        </div>
                                    </div>
                                </td>
                                <td> 
                                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="onRemoveCategory( index )"> <i class="mdi mdi-delete-outline"></i> </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="mt-3 d-flex">
                        <button class="ms-auto btn btn-primary" type="button" @click="onAddCategory()"> Agregar </button>
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
import { ref, watch, computed, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';

import {findVisita, newVisita, updateVisita}  from '@/services/visitas';
import {getAllCategories}  from '@/services/categorias';
import {getAllLocales}  from '@/services/locales';
import {getEstados}  from '@/services/estados';
import {allByRol}  from '@/services/usuarios';

import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { unique } from '@/helpers/validators';


const title = 'Visitas'

const breadcrumb = [
    {title: 'Visitas', active: false, link: '/visitas'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const isLoading = ref( false );
const id = ref( route.params.id || null );
const today = ref( new Date().toISOString().split("T")[0] );
const estados = ref([])
const locales = ref([])
const usuarios = ref([])
const categorias = ref([])

const initialState = {
    id: '',
    local: {
        id: ''
    },
    limpiador: {
        id: ''
    },
    tipo: 'month',
    fecha: '',
    start_time: '',
    end_time: '',
    latitud: '',
    longitud: '',
    estados_id: '',
    checkList: [],
    deletedServices: [],
};

const form = reactive({...initialState})
const rules = {
    local: { 
        id: { required }
    },
    limpiador: { 
        id: { required }
    },
    tipo: { required },
    fecha: { required },
    start_time: { required },
    end_time: { required },
    estados_id: { required },    
    checkList: {
        $each: helpers.forEach({
            categorias_id: { required, unique: unique( computed(() => form.checkList), 'categorias_id' ) }
        })
    }
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onAddCategory = () => {
    form.checkList.push({  id: '', categorias_id: '' })
}

const onRemoveCategory = (key) => {
    const service = form.checkList.splice(key, 1);
    form.deletedServices.push( service[0].id )
}

const onSearch = async () => {
    try {
        isLoading.value = true;
        const { data } = await findVisita( id.value );
        form.id = id.value
        form.local = data.local
        form.fecha = data.start_date.split(' ')[0]
        form.start_time = data.start_date.split(' ')[1]
        form.end_time = data.end_date.split(' ')[1]
        form.latitud = data.latitud
        form.longitud = data.longitud
        form.limpiador = data.attender
        form.estados_id = data.estados_id
        data.checklist.forEach( service => {
            form.checkList.push({
                id: service.id,
                categorias_id: service.categorias_id
            });
        })

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
            Alerts.update();
        } else {
            await newVisita( form );
            Alerts.create();
        }

        router.push('/visitas')

    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const getUsers = async() => {
    try {
        isLoading.value = true;
        const { data } = await allByRol([ 4 ]);
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

const allCategories = async( ) => {
    try {
        isLoading.value = true;
        const { data } = await getAllCategories();
        categorias.value = data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const allEstados = async( ) => {    
    try {
        isLoading.value = true;
        const { data } = await getEstados();
        estados.value = data;
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
    allEstados();
    allCategories();
})

</script>
<style scoped>
i {
    font-size: 1rem;
}   
</style>