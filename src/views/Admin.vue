<template>
    <div>
        {{ authStore.currentUser.email }}
        <br>
        <button @click="handleLogout">SignOut</button>
        <button @click="handleEditStudentsProfile">EditStudentProfile</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()
function handleEditStudentsProfile() {
    router.push("/editstudentsprofile")
    console.log("Go GO")
}
function handleLogout() {
    if (authStore.logout()) {
        router.push("/")
    } else {
        console.log("Got some error");
    }
    console.log("Logout Triggered")
}

</script>

<style scoped></style>