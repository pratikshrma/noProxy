<script setup>

import Navbar from '../components/Navbar.vue'
import TitleComponent from '../components/HomepageComponents/TitleComponent.vue'
import CheckAttendance from '../components/HomepageComponents/CheckAttendance.vue'

</script>

<template>
    <div class="homeTop">
<Navbar />
<TitleComponent />
</div>
<CheckAttendance />
</template>

<style scoped>
.homeTop{
    background-image: url(/Homepage-Background.svg);
    height:36.063rem;
    background-size: cover;
}
</style>