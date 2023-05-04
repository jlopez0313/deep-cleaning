<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <Datatable
                modulo="locales"
                :headers="headers"
                :items="items"
                :serverItemsLength="serverItemsLength"
                @dataChange="loadFromServer($event)"
            ></Datatable>
        </div>
    </div>

    <Fab :action="'/visitas/create'"></Fab>

</template>

<script setup>
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
    { text: "Acciones", value: "acciones" }
]

const error = ref('');
const items = ref([]);
const serverItemsLength = ref(0);

const loadFromServer = async( serverOptions ) => {
    try {
        const { data } = await getVisitas(serverOptions);
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        error.value = err.message;
    }
}

</script>

<style scoped>
i {
    font-size: 1rem;
}
</style>