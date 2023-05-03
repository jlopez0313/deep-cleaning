<template>
    <div>
        Lista de Usuarios

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td> {{ item.nombre }}</td>
                    <td> {{ item.email }}</td>
                    <td> 
                        <router-link to="usuarios/1"> Editar </router-link>
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
            nombre: 'Jonathan',
            email: 'Jonathan@correo.com'
        }
    ]);
</script>

<style>
</style>