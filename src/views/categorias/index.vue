<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <Datatable
                modulo="categorias"
                :headers="headers"
                :items="items"
                :serverItemsLength="serverItemsLength"
                @dataChange="loadFromServer($event)"
            ></Datatable>
        </div>
    </div>

    <Fab :action="'/categorias/create'"></Fab>
</template>

<script setup>
import Datatable from '@/components/Datatable.vue';
import Fab from '@/components/Fab.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref } from 'vue';
import {getCategorias}  from '@/services/categorias';

const title = 'Categorías'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Categoria", value: "categoria" },
    { text: "Acciones", value: "acciones" }
]

const error = ref('');
const items = ref([]);
const serverItemsLength = ref(0);

const loadFromServer = async( serverOptions ) => {
    try {
        const { data } = await getCategorias(serverOptions);
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        error.value = err.message;
    }
}
</script>

<style>
i {
    font-size: 1rem;
}
</style>