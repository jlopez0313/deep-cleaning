<template>
    <PageTitle :title="title" :breadcrumb="breadcrumb"></PageTitle>

    <div class="card">
        <div class="card-body">
            <form @submit="doSubmit($event)">
                <div class="row">
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Rol </label>
                            <select class="form-control" v-model="form.roles_id">
                                <option> </option>
                                <option v-for="rol in roles" :value="rol.id"> {{  rol.rol }}</option>
                            </select>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Email </label>
                            <input class="form-control" v-model="form.email" />
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Repetir Password </label>
                            <input class="form-control" type='password' v-model="form.password2" />
                        </div>                
                    </div>
                    <div class="col-lg-6">
                        <div>
                            <label class="form-label"> Nombre </label>
                            <input class="form-control" v-model="form.name" />
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Password </label>
                            <input class="form-control" type='password' v-model="form.password" />
                        </div>
                                
                    </div>
                </div>     
                
                <div>
                    <button class="btn btn-primary mt-3"> Guardar </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive, onBeforeMount } from 'vue'
import PageTitle from '@/components/PageTitle.vue';
import {findUser, newUser, updateUser}  from '@/services/usuarios';
import {getRoles}  from '@/services/roles';

const title = 'Form de Usuarios'

const breadcrumb = [
    {title: 'Usuarios', active: false, link: '/usuarios'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const error = ref('');
const roles = ref([])
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

const onSearch = async() => {
    try {
        const { data } = await findUser( id.value );
        form.id = id.value
        form.roles_id = data.roles_id;
        form.name = data.name
        form.email = data.email
        form.password = data.password
        form.password2 = data.password
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
            await updateUser( form );
        } else {
            await newUser( form );
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

onBeforeMount( async() => {
    try {
        const { data } = await getRoles();
        roles.value = data;
    } catch (err){
        error.value = err.message;
    }
}) 

</script>
<style>
    
</style>