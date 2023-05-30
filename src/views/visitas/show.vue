<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <form class="needs-validation">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"> Datos de la Visita </h4>
                    <div class="row">
                        <div class="col-lg-6 mt-3">
                            <div>
                                <label class="form-label"> Local </label>
                                <span class="form-control"> {{ form.local.local }} </span>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Fecha Límite </label>
                                <span class="form-control"> {{ form.end_date }} </span>
                            </div>                        
                        </div>
                        <div class="col-lg-6 mt-3">
                            <div>
                                <label class="form-label"> Limpiador </label>
                                <span class="form-control"> {{ form.limpiador.name }} </span>
                            </div>
                            <div class="mt-3">
                                <label class="form-label"> Fecha de Finalización </label>
                                <span class="form-control"> {{ form.finished_at || '-' }} </span>
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
                                <th>Finalizada</th>
                                <th>Evidencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in form.checkList" :key="index">
                                <td> {{ item.categoria.categoria }} </td>
                                <td> {{ item.done ? 'Si' : 'No' }} </td>
                                <td>
                                    <img :src="getPhotoUrl(item.evidencia)" class="foto cursor-pointer" 
                                        @click="openModal( item.evidencia )"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>                    

                </div>

            </div>
        </div>

        <div class="card" v-if="form.estado === 3">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-lg-6 mt-3">
                        <div>
                            <label class="form-label"> Revisado por </label>
                            <span class="form-control"> {{ form.approver.name }} </span>
                        </div>
                    </div>
                    <div class="col-lg-6 mt-3">
                        <div>
                            <label class="form-label"> Fecha de Revisión </label>
                            <span class="form-control"> {{ form.approved_at }} </span>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-6 mt-3">
                        <div>
                            <label class="form-label"> Firma: </label>
                            <br />
                            <img :src="getPhotoUrl(form.firma)" class="firma"/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    </form>

    <BModal v-model="showModal" scrollable centered size="md" title="Evidencia">
        <img :src="modalPhotoSrc" class="modalPhoto" />
    </BModal>

</template>

<script setup>
import { BButton, BModal } from "bootstrap-vue-next";

import { ref, watch, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';
import Maps from '@/components/Maps.vue';
import PageTitle from '@/components/PageTitle.vue';

import {findVisita, newVisita, updateVisita}  from '@/services/visitas';

const title = 'Detalle de Visitas'

const breadcrumb = [
    {title: 'Visitas', active: false, link: '/visitas'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const showModal = ref( false )
const isLoading = ref( false );
const modalPhotoSrc = ref( false );
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
    approver: {
        name: ''
    },
    estado: '',
    firma: '',
    fecha: '',
    end_date: '',
    finished_at: '',
    approved_at: '',
    latitud: '',
    longitud: '',
    checkList: [],
};

const form = reactive({...initialState, usuarios: []})

const getPhotoUrl = (phtoUrl) => {
    return import.meta.env.VITE_BASE_BACK + '/' + phtoUrl
}

const openModal = (phtoUrl) => {
    modalPhotoSrc.value = import.meta.env.VITE_BASE_BACK + '/' + phtoUrl
    showModal.value = true;
}

const onSearch = async () => {
    try {
        isLoading.value = true;
        const { data } = await findVisita( id.value );
        form.id = id.value
        form.local = data.local
        form.fecha = data.fecha
        form.firma = data.firma
        form.estado = data.estados_id
        form.end_date = data.end_date
        form.approver = data.approver
        form.finished_at = data.finished_at
        form.approved_at = new Date(data.approved_at).toLocaleString()
        form.latitud = data.latitud
        form.longitud = data.longitud    
        form.limpiador = data.attender
        form.checkList = data.checklist;

        markers.value.push({
            lat: form.local.latitud,
            lng: form.local.longitud,
            draggable: false,
            changeColor: false,
            title: form.local.local
        })

        markers.value.push({
            lat: form.latitud,
            lng: form.longitud,
            draggable: false,
            changeColor: true,
            title: 'Ejecución'
        });

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
.foto {
    max-width: 70px;
    max-height: 70px;
}

.firma {
    width: 270px;
}

.modalPhoto {
    width: 100%;
}
</style>