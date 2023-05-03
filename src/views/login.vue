<template>
    <form @click="onSubmit()" method="post">
        Login
        <div>
            <span> Email </span>
            <input v-model="form.email" />
        </div>
        <div>
            <span> Password </span>
            <input type='password' v-model="form.password" />
        </div>
        <div>
            <button> Ingresar </button>
        </div>
    </form>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'

const router = useRouter();

const initialState = {
    email: '',
    password: '',
};

const form = reactive({...initialState})

const onSubmit = async () => {
    router.push('/')
}

</script>
<style>
    
</style>