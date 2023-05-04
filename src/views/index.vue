<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            Bienvenido!
        </div>
    </div>
</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';

const title = 'Dashboard'

const breadcrumb = []

</script>

<style scoped>
    
</style>