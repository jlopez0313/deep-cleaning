<template>
    <div class="row main-content mt-5 justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card overflow-hidden">
                <div class="bg-login text-center">
                    <div class="bg-login-overlay"></div>

                    <div class="position-relative">
                        <h5 class="text-white font-size-20">Welcome Back !</h5>
                        <p class="text-white-50 mb-0">Sign in to continue.</p>
                        <a href="/" class="logo logo-admin mt-4">
                            <img src="/assets/images/logo-sm-dark.png" alt="" height="70">
                        </a>
                    </div>
                </div>
                <div class="card-body pt-5">
                    <div class="p-2">
                        <form class="needs-validation" @submit="doSubmit($event)" novalidate
                            :class="{'was-validated': v$.$invalid}"
                        >
                            <div class="mb-3">
                                <label class="form-label" for="username">Email</label>
                                <input type="email" class="form-control" id="username" placeholder="Enter email" name="email" v-model="form.email" required
                                    :class="{'border-danger': v$.email.$error}" 
                                >
                                <div class="text-danger text-invalid" v-if="v$.email.$error">
                                    {{ v$.email.$errors[0].$message }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="userpassword">Password</label>
                                <input type="password" class="form-control" id="userpassword" name="password"  v-model="form.password"
                                    placeholder="Enter password" :class="{'border-danger': v$.password.$error}"  required
                                >
                                <div class="text-danger text-invalid" v-if="v$.password.$error">
                                    {{ v$.password.$errors[0].$message }}
                                </div>
                            </div>

                            <div class="mt-3" v-if="!isLoading">
                                <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">Log In </button>
                            </div>
                        
                            <div class="mt-3" v-else>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                                </div>
                            </div>

                        </form>
                    </div>



                </div>
            </div>
            <div class="mt-5 text-center">
                <p>©
                    {{ date }}. 
                </p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Alerts from '@/composables/alerts';

import {login}  from '@/services/auth';
import {setUser} from '@/helpers/onboarding'

import { useVuelidate } from '@vuelidate/core'
import { required, email as isEmail } from '@vuelidate/validators'

const date = ref( new Date().getFullYear() );
const isLoading = ref( false );
const router = useRouter();

const initialState = {
    email: '',
    password: '',
    device: 'web'
};

const form = reactive({...initialState})
const rules = {
    email: { required, isEmail },
    password: { required },
}
const v$ = useVuelidate(rules, form, { $lazy: true, $autoDirty: true })

const doSubmit = async ( evt ) => {
    evt.preventDefault();

    const valid = await v$.value.$validate()
    if ( !valid ) {
        return;
    }

    try {
        isLoading.value = true;
        const {data} = await login( form );
        setUser( data )
        router.push('/')
    } catch (err){
        Alerts.error( err.message );
        isLoading.value = false;
    }
}

</script>
<style>
    
</style>