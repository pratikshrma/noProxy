<template>
    <div class="Navbar">
        <RouterLink to="/"><img src="/logo.svg" class="logo"></RouterLink>
        <CheckAttendance />

    </div>
</template>
    

<script setup>
import CheckAttendance from '../components/HomepageComponents/CheckAttendance.vue'
</script>
    
<style scoped>
.Navbar {
    width: 98%;
    height: 6.25rem;
    display: flex;
    padding: 0 2rem;
    justify-content: flex-start;

}

.logo {
    scale: 1.9;
    width: 8rem;
    height: 4.294rem;
    margin-top: 2rem;
    margin-left: 3rem;
}

.logo:hover {
    scale: 1.5;
    transition: .2s ease-in-out;
}
</style>
