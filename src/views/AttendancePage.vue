<template>
    <h1>
    {{ $route.params.id}} 
    </h1>
    <RouterView />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
const route=useRoute()
</script>

<style scoped>

</style>