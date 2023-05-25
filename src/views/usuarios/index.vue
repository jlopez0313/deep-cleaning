<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <div class="mb-3 d-flex">
                <button class="ms-auto btn btn-primary" type="button" :disabled="!selectedItems.length">
                    <i class="mdi mdi-delete-outline"></i>
                    Eliminar
                </button>
            </div>

            
            <Datatable
                modulo="usuarios"
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

    <Fab :action="'/usuarios/create'"></Fab>
</template>

<script setup>
import { ref } from 'vue';

import Alerts from '@/composables/alerts';
import Datatable from '@/components/Datatable.vue';
import PageTitle from '@/components/PageTitle.vue';
import Fab from '@/components/Fab.vue';

import {getUsuarios, removeUser}  from '@/services/usuarios';

const title = 'Usuarios'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Rol", value: "rol.rol" },
    { text: "Nombre", value: "name" },
    { text: "Email", value: "email" },
    { text: "Acciones", value: "acciones" }
]

const items = ref([]);
const selectedItems = ref([]);
const isLoading = ref( false );
const serverItemsLength = ref(0);
const acciones = ref(['editar', 'eliminar']);

const onItemsSelected = ( data ) => {
    selectedItems.value = data.map( item => {
        return item.id
    })
    console.log(selectedItems.value);
}

const loadFromServer = async( serverOptions ) => {
    try {
        isLoading.value = true;
        const { data } = await getUsuarios( serverOptions );
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const doRemove = ( {serverOptions, id}) => {
    Alerts.confirm('Validación', 'Deseas eliminar este registro?')
    .then( async ( {isConfirmed} ) => {
        if( isConfirmed) {
            isLoading.value = true;
            items.value = [];
            await removeUser(id);
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