<template lang="">
    <router-link :to="action">
        <button class="fab btn btn-primary btn-rounded">
            <i class="mdi mdi-plus"></i>
        </button>
    </router-link>
</template>

<script setup>
 const props = defineProps({
    action: ''
 })
</script>

<style scoped>
.fab {
    position: absolute;
    right: 0;
    bottom: 80px;
}

i {
    color: #fff;
    font-size: 1.2rem;
}
</style>