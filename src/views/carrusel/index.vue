<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <div class="mb-3 d-flex">
                <button class="btn btn-primary ms-auto" :disabled="!selectedItems.length" title="Eliminar" @click="doRemove({ serverOptions: serverOpts, ids: selectedItems })">
                    <i class="mdi mdi-delete-outline"></i>
                </button>
            </div>
            
            <Datatable
                modulo="carrusel"
                :items="items"
                :headers="headers"
                :acciones="acciones"
                :serverItemsLength="serverItemsLength"
                @onItemsSelected="onItemsSelected($event)"
                @dataChange="loadFromServer($event)"
                @delete="doRemove($event)"
            ></Datatable>

            <div class="mt-3" v-if="isLoading">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </div>

    <Fab :action="'/carrusel/create'"></Fab>
</template>

<script setup>
import { ref } from 'vue';

import Alerts from '@/composables/alerts';
import Datatable from '@/components/Datatable.vue';
import PageTitle from '@/components/PageTitle.vue';
import Fab from '@/components/Fab.vue';

import {getCarrusel, removeCarrusel}  from '@/services/carrusel';

const title = 'Carrusel'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Archivo", value: "archivo" },
    { text: "Acciones", value: "acciones" }
]

const items = ref([]);
const serverOpts = ref({});
const selectedItems = ref([]);
const isLoading = ref( false );
const serverItemsLength = ref(0);
const acciones = ref(['editar', 'eliminar']);

const onItemsSelected = ( {serverOptions, ids} ) => {
    serverOpts.value = serverOptions;
    selectedItems.value = ids.map( item => {
        return item.id
    })
    console.log(selectedItems.value);
}

const loadFromServer = async( serverOptions ) => {
    try {
        isLoading.value = true;
        const { data } = await getCarrusel( serverOptions );
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const doRemove = ( {serverOptions, ids} ) => {
    Alerts.confirm('Validación', `Deseas eliminar ${ ids.length > 1 ? 'estos registros' : 'este registro' } ?`)
    .then( async ( {isConfirmed} ) => {
        if( isConfirmed) {
            isLoading.value = true;
            items.value = [];

            Alerts.destroy();
            
            await removeCarrusel(ids);
            loadFromServer(serverOptions)
        }
    })
}
</script>

<style scoped>

i {
    font-size: 1rem;
}
</style>