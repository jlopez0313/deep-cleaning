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
                            <img src="/assets/images/logo-sm-dark.png" alt="" height="30">
                        </a>
                    </div>
                </div>
                <div class="card-body pt-5">
                    <div class="p-2">
                        <form class="form-horizontal" method="post" @submit="onSubmit($event)">
                            
                            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
                                {{ error }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="username">Email</label>
                                <input type="email" class="form-control" id="username" placeholder="Enter email" name="email" v-model="form.email">
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="userpassword">Password</label>
                                <input type="password" class="form-control" id="userpassword" name="password"  v-model="form.password"
                                placeholder="Enter password">
                            </div>

                            <div class="mt-3">
                                <button class="btn btn-primary w-100 waves-effect waves-light" type="submit">Log In </button>
                            </div>
                        
                        </form>
                    </div>

                </div>
            </div>
            <div class="mt-5 text-center">
                <p>©
                    {{ date }} Qovex. 
                </p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'
import {login}  from '@/services/auth';
import {setUser} from '@/helpers/onboarding'

const date = ref( new Date().getFullYear() );
const error = ref('');
const router = useRouter();

const initialState = {
    email: '',
    password: '',
    device: 'web'
};

const form = reactive({...initialState})

const onSubmit = async ( evt ) => {
    evt.preventDefault();
    try {
        const {data} = await login( form );
        setUser( data )
        router.push('/')
    } catch (err){
        error.value = err.message;
    }
}

</script>
<style>
    
</style>