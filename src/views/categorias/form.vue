<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <form @submit="doSubmit($event)">
                <div class="row">
                    <div class="col-lg-12">
                        <div>                            
                            <label class="form-label"> Categoría </label>
                            <input class="form-control" v-model="form.categoria" />
                        </div>
                        <div>
                            <button class="btn btn-primary mt-3"> Guardar </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findCategoria, newCategoria, updateCategoria}  from '@/services/categorias';

const title = 'Form de Categorías'

const breadcrumb = [
    {title: 'Categorías', active: false, link: '/categorias'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const error = ref('');
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    categoria: '',
};

const form = reactive({...initialState})

const onSearch = async () => {
    try {
        const { data } = await findCategoria( id.value );
        form.id = id.value
        form.categoria = data.categoria
    } catch (err){
        error.value = err.message;
    }
}


if( id.value ) {
    onSearch()
}

const doSubmit = async (evt) => {
    evt.preventDefault();
    
    try {
        if ( id.value ) {
            await updateCategoria( form );
        } else {
            await newCategoria( form );
        }
    } catch (err){
        error.value = err.message;
    }
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