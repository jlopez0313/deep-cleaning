<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="container-fluid">
                <div class="float-end">

                    <div class="dropdown d-inline-block">
                        <button type="button" class="btn header-item noti-icon waves-effect"
                            id="page-header-notifications-dropdown"  aria-haspopup="true"
                            aria-expanded="false">
                            <i class="mdi mdi-bell-outline"></i>
                            <span class="badge rounded-pill bg-danger ">3</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                            aria-labelledby="page-header-notifications-dropdown">
                            <div class="p-3">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="m-0"> Notifications </h6>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#!" class="small"> View All</a>
                                    </div>
                                </div>
                            </div>
                            <div data-simplebar style="max-height: 230px;">
                                <a href="" class="text-reset notification-item">
                                    <div class="d-flex align-items-start">
                                        <div class="avatar-xs me-3">
                                            <span class="avatar-title bg-primary rounded-circle font-size-16">
                                                <i class="bx bx-cart"></i>
                                            </span>
                                        </div>
                                        <div class="flex-1">
                                            <h6 class="mt-0 mb-1">Your order is placed</h6>
                                            <div class="font-size-12 text-muted">
                                                <p class="mb-1">If several languages coalesce the grammar</p>
                                                <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 3 min ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="" class="text-reset notification-item">
                                    <div class="d-flex align-items-start">
                                        <img src="/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                                            alt="user-pic">
                                        <div class="flex-1">
                                            <h6 class="mt-0 mb-1">James Lemire</h6>
                                            <div class="font-size-12 text-muted">
                                                <p class="mb-1">It will seem like simplified English.</p>
                                                <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="" class="text-reset notification-item">
                                    <div class="d-flex align-items-start">
                                        <div class="avatar-xs me-3">
                                            <span class="avatar-title bg-success rounded-circle font-size-16">
                                                <i class="bx bx-badge-check"></i>
                                            </span>
                                        </div>
                                        <div class="flex-1">
                                            <h6 class="mt-0 mb-1">Your item is shipped</h6>
                                            <div class="font-size-12 text-muted">
                                                <p class="mb-1">If several languages coalesce the grammar</p>
                                                <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 3 min ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="" class="text-reset notification-item">
                                    <div class="d-flex align-items-start">
                                        <img src="/assets/images/users/avatar-4.jpg" class="me-3 rounded-circle avatar-xs"
                                            alt="user-pic">
                                        <div class="flex-1">
                                            <h6 class="mt-0 mb-1">Salena Layfield</h6>
                                            <div class="font-size-12 text-muted">
                                                <p class="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="p-2 border-top d-grid">
                                <a class="btn btn-sm btn-link font-size-14 " href="javascript:void(0)">
                                    <i class="mdi mdi-arrow-right-circle me-1"></i> View More..
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown d-inline-block">
                        <button type="button" class="btn header-item waves-effect" :class="{ 'show': isShown}" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            @click="toggleShown()"

                        >
                            <img class="rounded-circle header-profile-user" src="/assets/images/users/avatar-2.jpg"
                                alt="Header Avatar">
                            <span class="d-none d-xl-inline-block ms-1">{{ user.user.name }}</span>
                            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                        </button>
                        <div 
                            class="dropdown-menu dropdown-menu-end" 
                            :class="{ 'show': isShown}"
                            style="
                                position: absolute;
                                inset: 0px auto auto 0px;
                                margin: 0px;
                                transform: translate(-100px, 72px);"
                            >
                            <!-- item-->
                            <a class="dropdown-item" href="#"><i class="bx bx-user font-size-16 align-middle me-1"></i>
                                Profile</a>
                            <div class="dropdown-divider"></div>
                            <router-link class="dropdown-item text-danger" to="/login">
                                <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> 
                                Logout
                            </router-link>
                        </div>
                    </div>

                </div>

                <div>
                    <!-- LOGO -->
                    <div class="navbar-brand-box">
                        <a href="index.html" class="logo logo-dark">
                            <span class="logo-sm">
                                <img src="/assets/images/logo-sm.png" alt="" height="20">
                            </span>
                            <span class="logo-lg">
                                <img src="/assets/images/logo-dark.png" alt="" height="17">
                            </span>
                        </a>

                        <a href="index.html" class="logo logo-light">
                            <span class="logo-sm">
                                <img src="/assets/images/logo-sm.png" alt="" height="20">
                            </span>
                            <span class="logo-lg">
                                <img src="/assets/images/logo-light.png" alt="" height="19">
                            </span>
                        </a>
                    </div>

                    <button type="button" class="btn btn-sm px-3 font-size-16 header-item toggle-btn waves-effect"
                        id="vertical-menu-btn"
                        @click="toggleMenu()"
                    >
                        <i class="fa fa-fw fa-bars"></i>
                    </button>

                </div>

            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import {getUser} from '@/helpers/onboarding'

const user = ref(null);
const isShown = ref(false);

onBeforeMount(() => {
    user.value = getUser();
})

const toggleShown = () => {
    isShown.value = !isShown.value
}

const toggleMenu = () => {
    if ( document.body.classList.contains('sidebar-enable') ) {
        document.body.classList.remove('sidebar-enable');
    } else {
        document.body.classList.add('sidebar-enable');
    }
}

</script>

<style scoped>
.dropdown-menu.show.dropdown-menu-end {
    
}    
</style>