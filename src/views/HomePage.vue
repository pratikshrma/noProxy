<script setup>

import Navbar from '../components/Navbar.vue'
import TitleComponent from '../components/HomepageComponents/TitleComponent.vue'


</script>

<template>
    <div class="homeTop">
        <Navbar />
        <TitleComponent />

    </div>
</template>

<style scoped>
.homeTop {
    background-image: url(/HomeImage.jpg);
    height: 100vh;
    background-size: cover;
}
</style>