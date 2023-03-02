<template>
    <p v-if="(!authStore.loading) && (authStore.currentUser != undefined)">Current User -> {{ authStore.currentUser.email }}
    </p>
    <div>
        <form @submit.prevent="handleSignin">
            <input v-model="email" type="text" placeholder="Enter Email">
            <input v-model="password" type="text" placeholder="Enter Password">
            <button>SignIn</button>
        </form>
    </div>
    <button @click="handleLogout">Logout</button>
</template>

<script setup>

import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

function handleSignin() {
    if (email.value == '' || password.value == '') {
        console.log("Enter a valid Email or Password");
        return
    }
    console.log(email.value, password.value)
    authStore.signin(email.value, password.value);
}

function handleLogout() {
    authStore.logout();
}

</script>