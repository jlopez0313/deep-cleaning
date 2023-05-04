<template>
    <div class="vertical-menu">
        <div class="h-100">

            <div class="user-wid text-center py-4">
                <div class="user-img">
                    <img src="/assets/images/users/avatar-2.jpg" alt="" class="avatar-md mx-auto rounded-circle">
                </div>

                <div class="mt-3">

                    <a href="#" class="text-reset fw-medium font-size-16">{{ user.user.name }} </a>
                    <p class="text-muted mt-1 mb-0 font-size-13">{{ user.user.rol.rol }}</p>

                </div>
            </div>

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title">Menu</li>

                    <li> <router-link to="/" @click="hideMenu()"> 
                        <i class="mdi mdi-home-outline"></i>
                        Inicio
                    </router-link> </li>
                    <li> <router-link to="/usuarios" @click="hideMenu()"> 
                        <i class="mdi mdi-account-circle-outline"></i>
                        Usuarios 
                    </router-link> </li>
                    <li> <router-link to="/categorias" @click="hideMenu()"> 
                        <i class="mdi mdi-calendar-check"></i>
                        Categorias
                    </router-link> </li>
                    <li> <router-link to="/locales" @click="hideMenu()"> 
                        <i class="mdi mdi-store"></i>
                        Locales
                    </router-link> </li>    
                    <li> <router-link to="/visitas" @click="hideMenu()"> 
                        <i class="mdi mdi-clipboard-list-outline"></i>
                        Visitas
                    </router-link> </li>
                    <div class="dropdown-divider"></div>

                    <li> <router-link to="/login" class="text-danger"> 
                        <i class="mdi mdi-logout text-danger"></i>                        
                        Salir
                    </router-link> </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue'
import {getUser} from '@/helpers/onboarding'

const user = ref(null);

onBeforeMount(() => {
    user.value = getUser();
})

const hideMenu = () => {
    document.body.classList.remove('sidebar-enable');
}
</script>

<style scoped>    
</style>