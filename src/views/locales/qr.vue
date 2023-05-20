<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <h4 class="card-title"> Datos del Local </h4>
            <div class="text-center">
                <img class="foto" v-if="qr" :src="qr"/>
            </div>
        </div>        
    </div>
            
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';

import {getQR}  from '@/services/locales';

const title = 'Locales'

const breadcrumb = [
    {title: 'Locales', active: false, link: '/locales'},
    {title: title, active: true}
]

const route  = useRoute();

const qr = ref('')
const isLoading = ref( false );
const id = ref( route.params.id || null );

const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data }= await getQR( id.value );
        qr.value = 'data:image/svg+xml;base64,' + data;
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

if( id.value ) {
    onSearch()
}

watch(
    () => route.params.id,
    async newId => {
        id.value = newId
        onSearch()
    }
)
</script>
<style scoped>
i {
    font-size: 1rem;
}

.foto {
    margin: 0 auto;
}
.map-danger {
    border: 1px solid #ff715b;
}
</style>