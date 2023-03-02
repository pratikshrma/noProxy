<script setup>
import { watchEffect } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/AuthStore';
import { auth } from '@/firebase'

const authStore = useAuthStore()

watchEffect(async () => {
  console.log("WatchE")
  authStore.loading = true
  const unsubscibe = await auth.onAuthStateChanged((user) => {
    authStore.currentUser = user;
    if (!!user) {
      localStorage.removeItem("user")
    } else {
      localStorage.setItem("user", user)
    }
  });
  unsubscibe();
  authStore.loading = false
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>