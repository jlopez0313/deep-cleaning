<template>
    <div>
        Form de Locales
        <div>
            <span> Nombre </span>
            <input v-model="form.local" />
        </div>
        <div>
            <span> Dirección </span>
            <input v-model="form.direccion" />
        </div>
        <div>
            <span> Ubicación </span>
            <img :src="form.ubicacion" width="600" />
        </div>
        <div>
            <span> Foto del Local </span>
            <input type="file"/>
        </div>
        <div>
            <button> Guardar </button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.usuarios" :key="index">
                    <td> {{ item.nombre }}</td>
                    <td> 
                        <a> Eliminar </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <button> Agregar </button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'

const router = useRouter();
const route  = useRoute();

const id = ref( route.params.id || null );

const usuarios = []

const initialState = {
    id: '',
    local: '',
    direccion: '',
    ubicacion: 'https://media.wired.com/photos/59333e64714b881cb296a4d4/master/w_2560%2Cc_limit/Google-Maps-shot-of-San-Francisco.png',
    foto: '',
    usuarios: [...usuarios]
};

const form = reactive({...initialState, usuarios: [...usuarios]})

const onSearch = () => {
    form.id = id.value
    form.local = 'Subway'
    form.direccion = 'Calle 1 Cra 2'
    // form.ubicacion = 'https://media.wired.com/photos/59333e64714b881cb296a4d4/master/w_2560%2Cc_limit/Google-Maps-shot-of-San-Francisco.png'
    form.foto = ''
    form.usuarios = [
        {
            nombre: 'Jonathan',
            email: 'Jonathan@correo.com'
        }
    ]
}


if( id.value ) {
    onSearch()
}

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