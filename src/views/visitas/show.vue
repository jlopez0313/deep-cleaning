<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <form class="needs-validation">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"> Datos de la Visita </h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <div>
                                <label class="form-label"> Local </label>
                                <span class="form-control"> {{ form.local.local }} </span>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Fecha de Visita </label>
                                <span class="form-control"> {{ form.fecha }} </span>
                            </div>                        
                        </div>
                        <div class="col-lg-6">
                            <div>
                                <label class="form-label"> Limpiador </label>
                                <span class="form-control"> {{ form.limpiador.name }} </span>
                            </div>                        
                        </div>
                        <div class="col-lg-12">
                            <div class="mt-3">
                                <label class="form-label"> Ubicación </label>
                                <Maps
                                    :key="form.id"
                                    :markers="markers"
                                ></Maps>                                
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

                </div>

            </div>
        </div>

    </form>
    
</template>

<script setup>
import Alerts from '@/composables/alerts';
import Maps from '@/components/Maps.vue';
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive, onBeforeMount } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findVisita, newVisita, updateVisita}  from '@/services/visitas';

const title = 'Detalle de Visitas'

const breadcrumb = [
    {title: 'Visitas', active: false, link: '/visitas'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const isLoading = ref( false );
const id = ref( route.params.id || null );
const markers= ref([]);

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

const form = reactive({...initialState, usuarios: []})

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
        form.checkList = data.checklist;

        markers.value.push({
            lat: form.latitud,
            lng: form.longitud,
            draggable: false,
            changeColor: true,
            title: 'Finalizado'
        });

        markers.value.push({
            lat: form.local.latitud,
            lng: form.local.longitud,
            draggable: false,
            changeColor: false,
            title: form.local.local
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