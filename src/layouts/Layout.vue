<template>
    <TopBar></TopBar>
    <SideMenu></SideMenu>
    <div class="main-content">
        <div class="page-content">
            <RouterView />    
        </div>

        <Footer></Footer>
    </div>
</template>
<script setup>
import TopBar from '@/layouts/top-bar/TopBar.vue';
import SideMenu from '@/layouts/side-menu/SideMenu.vue';
import Footer from '@/layouts/footer/Footer.vue';
</script>