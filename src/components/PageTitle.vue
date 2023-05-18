<template>
     <!-- start page title -->
     <div class="row">
        <div class="col-12">
            <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="page-title mb-0 font-size-18">
                    {{ title }}
                </h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">
                            <router-link to="/"> Dashboard </router-link>
                        </li>
                        <li v-for="item in breadcrumb" class="breadcrumb-item">
                            <span v-if="item.active"> {{ item.title }} </span>
                            <router-link v-else :to="item.link"> {{ item.title }} </router-link>
                        </li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <!-- end page title -->
</template>

<script setup>
const props = defineProps({
    title: String,
    link: String,
    breadcrumb: Array
})

</script>