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
                        <div class="mt-3">
                            <label class="form-label"> Foto de Perfil </label>
                            <input class="form-control" type="file" accept="image/*"
                                @change="onFileChange"
                            >
                        </div>
                        <div class="mt-3">
                            <img class="foto" v-if="foto" :src="foto" />
                        </div>
                    </div>
                    <div class="col-lg-6">
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

import { useStore } from 'vuex'
const store = useStore()

const title = 'Mi Pefil'
const breadcrumb = [
    {title: title, active: true}
]

const router = useRouter();

const user = getUser();
const foto = ref('');
const isLoading = ref( false );

const initialState = {
    id: '',
    roles_id: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    foto: '',
    oldPhoto: '',
};

const form = reactive({...initialState})
const rules = {
    roles_id: { required },
    name: { required },
    email: { required, email },
    password: { 
    },
    password2: { 
        required: requiredIf(form.password),
        sameAs: sameAs(computed(()=> form.password), "Password"),
    },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const onSearch = async() => {
    try {
        isLoading.value = true;
        const { data } = await findUser( user.user.id );
        form.id = user.user.id
        form.roles_id = data.roles_id;
        form.name = data.name
        form.email = data.email

        if (data.foto)  {
            foto.value = `${import.meta.env.VITE_BASE_BACK}/${data.foto}`;
            form.oldPhoto = data.foto;
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
        const updated = await updateUser( form );
        Alerts.update();
        user.user = updated.data
        setUser( user )
        store.commit('user/setUser', user)
    } catch (err){
        Alerts.error( err.message );
    } finally {
        isLoading.value = false;
    }
}

const onFileChange = (e) => {
    form.foto = e.target.files[0];
    foto.value = URL.createObjectURL(form.foto);
}


onBeforeMount( () => {
    onSearch();
}) 

</script>
<style>
.foto {
    max-height: 200px;
    max-width: 200px;
}
</style>