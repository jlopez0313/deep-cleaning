<template>
    <EasyDataTable
        buttons-pagination
        v-model:items-selected="selectedItems"
        v-model:server-options="serverOptions"
        theme-color="#3b5de7"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        table-class-name="customize-table"
        @update:itemsSelected="$event => onItemsSelected($event)"
    >
        
        <template #item-foto="item">
            <img :src="getPhotoUrl( item.foto )" class="foto" />
        </template>

        <template #item-acciones="item">
            <router-link v-if="acciones.includes('qr')" :to="`/${modulo}/qr/${item.id}`" title="QR" class="btn btn-outline-secondary btn-sm">
                <i class="mdi mdi-qrcode"></i> 
            </router-link>
            <router-link v-if="acciones.includes('ver')" :to="`/${modulo}/show/${item.id}`" title="Ver" class="btn btn-outline-secondary btn-sm">
                <i class="mdi mdi-magnify"></i> 
            </router-link>
            <router-link v-if="acciones.includes('editar')" :to="`/${modulo}/${item.id}`" title="Editar" class="btn btn-outline-secondary btn-sm ms-4">
                <i class="mdi mdi-pencil-outline"></i>
            </router-link>
            <button v-if="acciones.includes('eliminar')" @click="emit('delete', {serverOptions, id: item.id})" title="Eliminar" class="btn btn-outline-secondary btn-sm ms-4">
                <i class="mdi mdi-delete-outline"></i>
            </button>
        </template>
    </EasyDataTable>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue';

const loading = ref(false);

const emit = defineEmits()
const selectedItems = ref([]);

const props = defineProps({
    modulo: String,
    acciones: Array,
    headers: Array,
    items: Array,
    serverItemsLength: Number
})

const onItemsSelected = () => {
    emit('onItemsSelected', selectedItems.value);
}

const serverOptions = ref({
    page: 1,
    rowsPerPage: 25
});

const getPhotoUrl = ( fotoUrl ) => {
    return import.meta.env.VITE_BASE_BACK + '/' + fotoUrl
}

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

<style scoped>
    .foto {
        max-width: 70px;
        max-height: 70px;
    }
</style>