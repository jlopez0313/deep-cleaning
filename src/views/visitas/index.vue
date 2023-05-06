<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <Datatable
                modulo="visitas"
                :items="items"
                :headers="headers"
                :acciones="acciones"
                :serverItemsLength="serverItemsLength"
                @dataChange="loadFromServer($event)"
            ></Datatable>

            <div class="mt-3" v-if="isLoading">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </div>

    <Fab :action="'/visitas/create'"></Fab>
</template>

<script setup>
import Alerts from '@/composables/alerts';
import Datatable from '@/components/Datatable.vue';
import Fab from '@/components/Fab.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref, onBeforeMount } from 'vue';
import {getVisitas}  from '@/services/visitas';

const title = 'Visitas'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Local", value: "local.local" },
    { text: "Fecha de ASignación", value: "fecha" },
    { text: "Fecha de Ejecución", value: "finished_at" },
    { text: "Estado", value: "estado.estado" },
    { text: "Acciones", value: "acciones" }
]

const items = ref([]);
const isLoading = ref( false );
const serverItemsLength = ref(0);
const acciones = ref(['ver', 'editar', 'eliminar']);

const loadFromServer = async( serverOptions ) => {
    try {
        isLoading.value = true;
        const { data } = await getVisitas(serverOptions);
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

</script>

<style scoped>
i {
    font-size: 1rem;
}
</style>