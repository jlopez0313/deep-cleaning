<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <form class="needs-validation" @submit="doSubmit($event)" novalidate
                :class="{'was-validated': v$.$invalid}"
            >
                <div class="row">
                    <div class="col-lg-12">
                        <div class="mt-3">
                            <label class="form-label"> Selecciona un Limpiador </label>
                            <select class="form-control" v-model="form.usuarios_id" required
                                :class="{'border-danger': v$.usuarios_id.$error}" 
                            >
                                <option> - </option>
                                <option v-for="user in usuarios" :value="user.id"> {{  user.name }}</option>
                            </select>
                            <div class="text-danger text-invalid" v-if="v$.usuarios_id.$error">
                                    {{ v$.usuarios_id.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3" v-if="isLoading">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-body" v-if="form.usuarios_id">
            <Datatable
                modulo="visitas"
                :items="items"
                :headers="headers"
                :acciones="acciones"
                :serverItemsLength="serverItemsLength"
                @dataChange="loadFromServer($event)"
                @delete="doRemove($event)"
            ></Datatable>
        </div>
    </div>

    <Fab :action="'/visitas/create'"></Fab>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';

import Alerts from '@/composables/alerts';
import Datatable from '@/components/Datatable.vue';
import PageTitle from '@/components/PageTitle.vue';
import Fab from '@/components/Fab.vue';

import {getVisitas, removeVisita}  from '@/services/visitas';
import {allByRol}  from '@/services/usuarios';

import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const title = 'Visitas'
const breadcrumb = [
    {title: title, active: true}
]
const headers = [
    { text: "Local", value: "local.local" },
    { text: "Limpiador", value: "attender.name" },
    { text: "Fecha Límite", value: "end_date" },
    { text: "Fecha de Ejecución", value: "finished_at" },
    { text: "Estado", value: "estado.estado" },
    { text: "Acciones", value: "acciones" }
]

const initialState = {
    usuarios_id: '',
}
const form = reactive({...initialState})
const rules = {
    usuarios_id: { required }
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })


const items = ref([]);
const usuarios = ref([])
const isLoading = ref( false );
const serverItemsLength = ref(0);
const acciones = ref(['ver', 'editar', 'eliminar']);

const loadFromServer = async( serverOptions ) => {
    try {
        isLoading.value = true;
        const { data } = await getVisitas( form, serverOptions);
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
            await removeVisita(id);
            loadFromServer(serverOptions)
        }
    })
}

const getUsers = async() => {
    try {
        isLoading.value = true;
        const { data } = await allByRol([ 4 ]);
        usuarios.value = data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

onBeforeMount( () => {
    getUsers();
});

</script>

<style scoped>
i {
    font-size: 1rem;
}
</style>