<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import TitleComponent from '../components/HomepageComponents/TitleComponent.vue'
import CheckAttendance from '../components/HomepageComponents/CheckAttendance.vue'
import Notice from '../components/HomepageComponents/NoticeOfDepartment.vue'
</script>

<template>
    <div class="homeTop">
<Navbar />
<TitleComponent />
</div>
<CheckAttendance />
<Notice />
</template>

<style scoped>
.homeTop{
    background-image: url(src/assets/Homepage-Background.svg);
    height:36.063rem;
    background-size: cover;
}
</style>