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
    width: 100%;
    height: 6.25rem;
    display: flex;
    justify-content: space-evenly;
}

.logo {
    scale: 1.9;
    width: 8rem;
    height: 4.294rem;
    margin-top: 2rem;
    margin-left: 10rem;

}

.logo:hover {
    scale: 1.5;
    transition: .2s ease-in-out;
}

@media screen and (max-width:890px) {
    .logo {
        margin-left: 4rem;
        scale: 1;
        transform: scale(1.5);
    }

    .Navbar {
        justify-content: space-between;
    }

}
</style>
