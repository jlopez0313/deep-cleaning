<template>
    <div>
        Lista de Visitas

        <table>
            <thead>
                <tr>
                    <th>Local</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td> {{ item.local }}</td>
                    <td> 
                        <router-link to="locales/1"> Editar </router-link>
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
            local: 'Subway',
        }
    ]);
</script>

<style>
</style>