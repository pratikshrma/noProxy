<template>
    <div>
        {}
        <button @click="handleLogout">SignOut</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()
function handleLogout() {
    authStore.logout();
    router.push({ name: "login" })
    console.log("Logout Triggered")
}
watchEffect(()=>{
    //get Initial Teacher Data
    
})
</script>

<style scoped></style>