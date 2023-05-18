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
                            <label class="form-label"> Rol </label>
                            <select class="form-control" v-model="form.roles_id" required
                                :class="{'border-danger': v$.roles_id.$error}" 
                            >
                                <option value=""> - </option>
                                <option v-for="rol in roles" :value="rol.id"> {{  rol.rol }}</option>
                            </select>
                            <div class="text-danger text-invalid" v-if="v$.roles_id.$error">
                                    {{ v$.roles_id.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Líder </label>
                            <select class="form-control" v-model="form.parent_id">
                                <option value=""> - </option>
                                <option v-for="user in usuarios" :value="user.id"> {{  user.name }}</option>
                            </select>
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
                    </div>
                    <div class="col-lg-6">
                        <div class="mt-3">
                            <label class="form-label"> Email </label>
                            <input class="form-control" v-model="form.email" required
                                :class="{'border-danger': v$.email.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.email.$error">
                                    {{ v$.email.$errors[0].$message }}
                            </div>
                        </div>  
                        <div class="mt-3">
                            <label class="form-label"> Password </label>
                            <input class="form-control" type='password' v-model="form.password" :required="!id"
                                :class="{'border-danger': v$.password.$error}" 
                            >
                            <div class="text-danger text-invalid" v-if="v$.password.$error">
                                    {{ v$.password.$errors[0].$message }}
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label"> Repetir Password </label>
                            <input class="form-control" type='password' v-model="form.password2" :required="!id"
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
import { ref, watch, reactive, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';
import PageTitle from '@/components/PageTitle.vue';

import {findUser, newUser, updateUser}  from '@/services/usuarios';
import {getRoles}  from '@/services/roles';
import {allUsers}  from '@/services/usuarios';

import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, requiredIf } from '@vuelidate/validators'

import {getUser, setUser} from '@/helpers/onboarding'

const title = 'Usuarios'
const breadcrumb = [
    {title: 'Usuarios', active: false, link: '/usuarios'},
    {title: title, active: true}
]

const router = useRouter();
const route  = useRoute();

const user = getUser();
const roles = ref([])
const usuarios = ref([])
const isLoading = ref( false );
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    roles_id: '',
    parent_id: '',
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
    password: { 
        required: requiredIf(!id.value)
    },
    password2: { 
        required: requiredIf(!id.value),
        sameAs: sameAs(computed(()=> form.password), "Password"),
    },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })


const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data } = await findUser( id.value );
        form.parent_id = data.parent_id || null;
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
            const updated = await updateUser( form );
            Alerts.update();
            if ( user.user.id == id.value ) {
                user.user = updated.data
                setUser( user )
            }
        } else {
            await newUser( form );
            Alerts.create();
        }

        router.push('/usuarios')
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const getAll = () => {
    const p1 = getRoles();
    const p2 = allUsers();

    Promise.all([p1, p2])
    .then( values => {
        roles.value = values[0].data;
        usuarios.value = values[1].data;
    }).catch( err => {
        Alerts.error( err.message );
    }).finally( () => {
        isLoading.value = false;
    });
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
    getAll();
}) 

</script>
<style>
    
</style>