<template>
    <div>
        <router-link to="/"> Inicio </router-link>
        <router-link to="/login"> Login </router-link>

        <router-link to="/usuarios"> Usuarios </router-link>
        <router-link to="/usuarios/create"> Crear Usuarios </router-link>
        <router-link to="/usuarios/1"> Modificar Usuarios </router-link>
        
        <router-link to="/categorias"> Categorias </router-link>
        <router-link to="/categorias/create"> Crear Categoria </router-link>
        <router-link to="/categorias/1"> Modificar Categoria </router-link>
        
        <router-link to="/locales"> Locales </router-link>
        <router-link to="/locales/create"> Crear Local </router-link>
        <router-link to="/locales/1"> Modificar Local </router-link>
        
        <router-link to="/visitas"> Visitas </router-link>
        <router-link to="/visitas/create"> Crear Visita </router-link>
        <router-link to="/visitas/1"> Modificar Visita </router-link>

    </div>
    <RouterView />
</template>

<style>
    
</style>