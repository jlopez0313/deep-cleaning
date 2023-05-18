import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/index.vue')
            },
        ]
    },{
        path: '/login',
        component: () => import('@/views/login.vue'),
    },
    {
        path: '/usuarios',
        component: () => import('@/layouts/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/usuarios/index.vue')
            },
            {
                path: 'create',
                component: () => import('@/views/usuarios/form.vue')
            },
            {
                path: ':id',
                component: () => import('@/views/usuarios/form.vue')
            }
        ]
    },
    {
        path: '/categorias',
        component: () => import('@/layouts/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/categorias/index.vue')
            },
            {
                path: 'create',
                component: () => import('@/views/categorias/form.vue')
            },
            {
                path: ':id',
                component: () => import('@/views/categorias/form.vue')
            }
        ]
    },
    {
        path: '/locales',
        component: () => import('@/layouts/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/locales/index.vue')
            },
            {
                path: 'create',
                component: () => import('@/views/locales/form.vue')
            },
            {
                path: ':id',
                component: () => import('@/views/locales/form.vue')
            }
        ]
    },
    {
        path: '/visitas',
        component: () => import('@/layouts/Layout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/visitas/index.vue')
            },
            {
                path: 'create',
                component: () => import('@/views/visitas/form.vue')
            },
            {
                path: 'show/:id',
                component: () => import('@/views/visitas/show.vue')
            },
            {
                path: ':id',
                component: () => import('@/views/visitas/form_edit.vue')
            }
        ]
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: routes,
})

export default router;