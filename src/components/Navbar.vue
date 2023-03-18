<template>
    <div class="Navbar">
        <RouterLink to="/"><img src="/logo.svg" class="logo"></RouterLink>
        <CheckAttendance />
        <div class="attendance">Attendance</div>
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
    justify-content: space-evenly;
}

.logo {
    scale: 1.9;
    width: 13.875rem;
    height: 4.294rem;
    margin-top: 2rem;
    margin-left: 3rem;
}

.logo:hover {
    scale: 1.5;
    transition: .2s ease-in-out;
}

.attendance {
    height: 3rem;
    width: 12rem;
    border-radius: 15px;
    background-color: #ff9820;
    border: 1px solid #ff9820;
    font-size: 18px;
    box-shadow: 1px 1px 10px #0d2726;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    margin-right: 2rem;
    display: none;
}

.attendance:hover {
    border: 1px solid white;
    scale: 1.1;
    box-shadow: 0px 0px 7px white;
    transition: .2s ease-in-out;
}
</style>
