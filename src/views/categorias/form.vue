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
                            <label class="form-label"> Servicio </label>
                            <input class="form-control" v-model="form.categoria" required
                                :class="{'border-danger': v$.categoria.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.categoria.$error">
                                    {{ v$.categoria.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3" v-if="!isLoading">
                            <button class="btn btn-primary" type="submit">Guardar </button>
                        </div>
                                
                        <div class="mt-3" v-else>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                            </div>
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
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';

import {findCategoria, newCategoria, updateCategoria}  from '@/services/categorias';


const title = 'Servicios'

const breadcrumb = [
    {title: 'Servicios', active: false, link: '/categorias'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const isLoading = ref( false );
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    categoria: '',
};

const form = reactive({...initialState})
const rules = {
    categoria: { required },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onSearch = async () => {
    try {
        isLoading.value = true;
        const { data } = await findCategoria( id.value );
        form.id = id.value
        form.categoria = data.categoria;

    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}


if( id.value ) {
    onSearch()
}

const doSubmit = async (evt) => {
    evt.preventDefault();

    const valid = await v$.value.$validate()
    if ( !valid ) {
        return;
    }
    
    try {
        isLoading.value = true;
        
        if ( id.value ) {
            await updateCategoria( form );
            Alerts.update();
        } else {
            await newCategoria( form );
            Alerts.create();
        }

        router.push('/categorias')

    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
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