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
                modulo="locales"
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

    <Fab :action="'/locales/create'"></Fab>
</template>

<script setup>
import { ref } from 'vue';

import Alerts from '@/composables/alerts';
import Datatable from '@/components/Datatable.vue';
import PageTitle from '@/components/PageTitle.vue';
import Fab from '@/components/Fab.vue';

import {getLocales, removeLocales}  from '@/services/locales';

const title = 'Locales'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Logo", value: "foto" },
    { text: "Local", value: "local", sortable: true },
    { text: "Acciones", value: "acciones" }
]

const items = ref([]);
const serverOpts = ref({});
const selectedItems = ref([]);
const isLoading = ref( false );
const serverItemsLength = ref(0);
const acciones = ref(['qr', 'editar', 'eliminar']);

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
        const { data } = await getLocales(serverOptions);
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
            
            await removeLocales(ids);
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