<template>
    <div>
        Lista de Categorías

        <table>
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td> {{ item.categoria }}</td>
                    <td> 
                        <router-link to="categorias/1"> Editar </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const list = ref([
        {
            categoria: 'Cocina',
        }
    ]);
</script>

<style>
</style>