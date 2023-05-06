<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <form class="needs-validation" @submit="doSubmit($event)" novalidate
                :class="{'was-validated': v$.$invalid}"
            >
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Rol </label>
                            <select class="form-control" v-model="form.roles_id" required
                                :class="{'border-danger': v$.roles_id.$error}" 
                            >
                                <option> - </option>
                                <option v-for="rol in roles" :value="rol.id"> {{  rol.rol }}</option>
                            </select>
                            <div class="text-danger text-invalid" v-if="v$.roles_id.$error">
                                    {{ v$.roles_id.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Nombre </label>
                            <input class="form-control" v-model="form.name" required
                                :class="{'border-danger': v$.name.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.name.$error">
                                    {{ v$.name.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Email </label>
                            <input class="form-control" v-model="form.email" required
                                :class="{'border-danger': v$.email.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.email.$error">
                                    {{ v$.email.$errors[0].$message }}
                            </div>
                        </div>               
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Password </label>
                            <input class="form-control" type='password' v-model="form.password" required
                                :class="{'border-danger': v$.password.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.password.$error">
                                    {{ v$.password.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Repetir Password </label>
                            <input class="form-control" type='password' v-model="form.password2" required
                                :class="{'border-danger': v$.password2.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.password2.$error">
                                    {{ v$.password2.$errors[0].$message }}
                            </div>
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
import Alerts from '@/composables/alerts';
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive, onBeforeMount, computed } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findUser, newUser, updateUser}  from '@/services/usuarios';
import {getRoles}  from '@/services/roles';

import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

const title = 'Form de Usuarios'
const breadcrumb = [
    {title: 'Usuarios', active: false, link: '/usuarios'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const roles = ref([])
const isLoading = ref( false );
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    roles_id: '',
    name: '',
    email: '',
    password: '',
    password2: '',
};

const form = reactive({...initialState})
const rules = {
    roles_id: { required },
    name: { required },
    email: { required, email },
    password: { required },
    password2: { required, sameAs: sameAs(computed(()=> form.password), "Password"), },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })


const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data } = await findUser( id.value );
        form.id = id.value
        form.roles_id = data.roles_id;
        form.name = data.name
        form.email = data.email
        form.password = data.password
        form.password2 = data.password
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
            await updateUser( form );
        } else {
            await newUser( form );
        }
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const getAllRoles = async () => {
    try {
        isLoading.value = true;
        const { data } = await getRoles();
        roles.value = data;
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



onBeforeMount( () => {
    getAllRoles();
}) 

</script>
<style>
    
</style>