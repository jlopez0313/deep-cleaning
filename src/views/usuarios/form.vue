<template>
    <div>
        Form de Usuarios
        <div>
            <span> Rol </span>
            <select v-model="form.rol">
                <option> </option>
                <option v-for="rol in roles" :value="rol.id"> {{  rol.rol }}</option>
            </select>
        </div>
        <div>
            <span> Nombre </span>
            <input v-model="form.name" />
        </div>
        <div>
            <span> Email </span>
            <input v-model="form.email" />
        </div>
        <div>
            <span> Password </span>
            <input type='password' v-model="form.password" />
        </div>
        <div>
            <span> Repetir Password </span>
            <input type='password' v-model="form.password2" />
        </div>
        <div>
            <button> Guardar </button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'

const router = useRouter();
const route  = useRoute();
const id = ref( route.params.id || null );

const initialState = {
    id: '',
    rol: '',
    name: '',
    email: '',
    password: '',
    password2: '',
};

const form = reactive({...initialState})

const onSearch = () => {
    form.id = id.value
    form.rol = 1
    form.name = 'Jonathan'
    form.email = 'Jonathan@correo.com'
    form.password = 'admin'
    form.password2 = 'admin'
}

if( id.value ) {
    onSearch()
}

const roles = ref([
    {
        id: 1,
        rol: 'SuperAdmin',
    },
    {
        id: 2,
        rol: 'Administrador',
    },
    {
        id: 3,
        rol: 'Supervisor',
    },
    {
        id: 4,
        rol: 'Cliente',
    },
    {
        id: 5,
        rol: 'Limpiador',
    },
])

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

</script>
<style>
    
</style>