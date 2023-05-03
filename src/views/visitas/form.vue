<template>
    <div>
        Form de Visitas
        <div>
            <span> Local </span>
            <select v-model="form.local.id">
                <option> </option>
                <option v-for="local in locales" :value="local.id"> {{  local.local }}</option>
            </select>
        </div>
        <div>
            <span> Limpiador </span>
            <select v-model="form.limpiador.id">
                <option> </option>
                <option v-for="user in usuarios" :value="user.id"> {{  user.nombre }}</option>
            </select>
        </div>
        <div>
            <span> Fecha de Visita </span>
            <input type="date" v-model="form.fecha" />
        </div>
        <div>
            <button> Guardar </button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Checklist</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.checkList" :key="index">
                    <td> {{ item.categoria.categoria }}</td>
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

const locales = [{
    id: 1,
    local: 'Subway'
}]

const usuarios = [{
    id: 1,
    nombre: 'Jonathan',
    email: 'Jonathan@correo.com'
}]

const initialState = {
    id: '',
    local: '',
    limpiador: '',
    fecha: '',
    checkList: [],
};

const form = reactive({...initialState, checkList: []})

const onSearch = () => {
    form.id = id.value
    form.local = {
        id: 1,
        local: 'Subway'
    }
    form.fecha = 'Abril 24'
    form.limpiador = {
        id: 1,
        nombre: 'Jonathan',
        email: 'Jonathan@correo.com'
    }
    form.checkList = [{
        id: 1,
        categoria: {
            id: 1,
            categoria: 'Cocina'
        }
    }]

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