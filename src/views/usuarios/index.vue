<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <Datatable
                modulo="usuarios"
                :headers="headers"
                :items="items"
                :serverItemsLength="serverItemsLength"
                @dataChange="loadFromServer($event)"
            ></Datatable>
        </div>
    </div>

    <Fab :action="'/usuarios/create'"></Fab>
</template>

<script setup lang="jsx" >
import Datatable from '@/components/Datatable.vue';
import Fab from '@/components/Fab.vue';
import PageTitle from '@/components/PageTitle.vue';
import { ref } from 'vue';
import {getUsuarios}  from '@/services/usuarios';

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


const error = ref('');
const items = ref([]);
const serverItemsLength = ref(0);


const loadFromServer = async( serverOptions ) => {
    try {
        const { data } = await getUsuarios( serverOptions );
        items.value = data.data;
        serverItemsLength.value = data.total;
    } catch (err){
        error.value = err.message;
    }
}
</script>

<script  lang="jsx">
    const test = () => {
        alert('hola')
        
    }

    export default {
        methods: {
            test() {
                alert('hola')
            }
        }
    }
</script>

<style scoped>

i {
    font-size: 1rem;
}
</style>