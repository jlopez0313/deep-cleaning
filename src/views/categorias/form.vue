<template>
    <div>
        Form de Categorías
        <div>
            <span> Categoría </span>
            <input v-model="form.categoria" />
        </div>
        <div>
            <button> Guardar </button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'

const router = useRouter();
const route  = useRoute();

const id = ref( route.params.id || null );

const initialState = {
    id: '',
    categoria: '',
};

const form = reactive({...initialState})

const onSearch = () => {
    form.id = id.value
    form.categoria = 'Cocinas'
}


if( id.value ) {
    onSearch()
}

watch(
    () => route.params.id,
    async newId => {
        id.value = newId
        if ( newId ) {
            onSearch()
        } else {
            Object.assign(form, {...initialState})
        }
    }
)

</script>
<style>
    
</style>