<template>
    <EasyDataTable
        buttons-pagination
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        table-class-name="customize-table"
    >
        <template #item-acciones="item">
            <router-link v-if="acciones.includes('ver')" :to="`/${modulo}/show/${item.id}`" title="Ver" class="btn btn-outline-secondary btn-sm">
                <i class="mdi mdi-magnify"></i> 
            </router-link>
            <router-link v-if="acciones.includes('editar')" :to="`/${modulo}/${item.id}`" title="Editar" class="btn btn-outline-secondary btn-sm ms-4">
                <i class="mdi mdi-pencil-outline"></i>
            </router-link>
            <router-link v-if="acciones.includes('eliminar')" :to="`/${modulo}/${item.id}`" title="Eliminar" class="btn btn-outline-secondary btn-sm ms-4">
                <i class="mdi mdi-delete-outline"></i>
            </router-link>
        </template>
    </EasyDataTable>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue';
const loading = ref(false);

const emit = defineEmits()

const props = defineProps({
    modulo: '',
    acciones: [],
    headers: [],
    items: [],
    serverItemsLength: 0
})

const serverOptions = ref({
    page: 1,
    rowsPerPage: 25
});

watch(serverOptions, ( value ) => {
    loading.value = true;
    emit('dataChange', serverOptions.value);
});

watch( props, () => {
    loading.value = false;
})

onBeforeMount( () => {
    emit('dataChange', serverOptions.value);
})
</script>