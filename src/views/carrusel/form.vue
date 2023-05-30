<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <form class="needs-validation" @submit="doSubmit($event)" novalidate
                :class="{'was-validated': v$.$invalid}"
            >
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mt-3">
                            <label class="form-label"> Archivo</label>
                            <input class="form-control" type="file" accept="image/*"
                                @change="onFileChange"
                            >
                        </div>
                        <div class="mt-3">
                            <img class="archivo" v-if="archivo" :src="archivo" />
                        </div>
                    </div>
                </div>     
                
                <div class="mt-3" v-if="!isLoading">
                    <button class="btn btn-primary" type="submit"> Guardar </button>
                </div>
                        
                <div class="mt-3" v-else>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';

import {findCarrusel, newCarrusel, updateCarrusel}  from '@/services/carrusel';

import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, requiredIf } from '@vuelidate/validators'

import { useStore } from 'vuex'
const store = useStore()

const title = 'Carrusel'
const breadcrumb = [
    {title: 'Carrusel', active: false, link: '/carrusel'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const archivo = ref('');
const isLoading = ref( false );
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    archivo: '',
    oldPhoto: '',
};

const form = reactive({...initialState})
const rules = {
    archivo: { 
        required: requiredIf(!form.id),
    },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data } = await findCarrusel( id.value );
        form.id = id.value

        if (data.archivo)  {
            archivo.value = `${import.meta.env.VITE_BASE_BACK}/${data.archivo}`;
            form.oldPhoto = data.archivo;
        }

    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
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
            await updateCarrusel( form );
            Alerts.update();
        } else {
            await newCarrusel( form );
            Alerts.create();
        }

        router.push('/carrusel')
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const onFileChange = (e) => {
    form.archivo = e.target.files[0];
    archivo.value = URL.createObjectURL(form.archivo);
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
.archivo {
    max-height: 200px;
    max-width: 200px;
}
</style>