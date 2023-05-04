<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td> {{ item.name }}</td>
                            <td> {{ item.email }}</td>
                            <td class="d-flex align-items-center justify-content-center"> 
                                <router-link :to="`usuarios/${item.id}`" title="Editar" class="btn btn-outline-secondary btn-sm"> <i class="mdi mdi-pencil-outline"></i> </router-link>
                                <router-link :to="`usuarios/${item.id}`" title="Eliminar" class="btn btn-outline-secondary btn-sm ms-4"> <i class="mdi mdi-delete-outline"></i>  </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Fab :action="'/usuarios/create'"></Fab>
</template>

<script setup>
import Fab from '@/components/Fab.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref, onBeforeMount } from 'vue';
import {getUsuarios}  from '@/services/usuarios';

const title = 'Usuarios'

const breadcrumb = [
    {title: title, active: true}
]

const error = ref('');
const list = ref([]);

onBeforeMount(async () => {
    try {
        const { data } = await getUsuarios();
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