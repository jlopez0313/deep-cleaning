<template lang="">
    <footer class="footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    {{ date }} ©
                </div>
                <div class="col-sm-6">
                    <div class="text-sm-end d-none d-sm-block">
                        
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    const date = new Date().getFullYear();
</script>

<style>
</style>