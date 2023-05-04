<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Local</th>
                            <th>creado por</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td> {{ item.local }}</td>
                            <td> {{ item.creador.name }}</td>
                            <td class="d-flex align-items-center">
                                <router-link :to="`locales/${item.id}`" title="Editar" class="btn btn-outline-secondary btn-sm"> <i class="mdi mdi-pencil-outline"></i> </router-link>
                                <router-link :to="`locales/${item.id}`" title="Eliminar" class="btn btn-outline-secondary btn-sm ms-4"> <i class="mdi mdi-delete-outline"></i>  </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Fab :action="'/locales/create'"></Fab>
</template>

<script setup>
import Fab from '@/components/Fab.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref, onBeforeMount } from 'vue';
import {getLocales}  from '@/services/locales';

const title = 'Locales'

const breadcrumb = [
    {title: title, active: true}
]

const list = ref([]);

onBeforeMount(async () => {
    try {
        const { data } = await getLocales();
        list.value = data.data;
    } catch (err){
        error.value = err.message;
    }
})

</script>

<style scoped>
i {
    font-size: 1rem;
}
</style>