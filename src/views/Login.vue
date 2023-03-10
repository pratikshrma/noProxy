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
    <div v-if="success">{{ authStore.errorMessage }}</div>
</template>

<script setup>

import { useAuthStore } from '../stores/AuthStore';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter()
var success = ref('true')
async function handleSignin() {
    if (email.value == '' || password.value == '') {
        console.log("Enter a valid Email or Password");
        return
    }
    console.log(email.value, password.value)
    success = await authStore.signin(email.value, password.value);
}
watchEffect(() => {
    console.log(authStore.currentUser)
    if (authStore.currentUser != null) {
        localStorage.setItem("user", authStore.currentUser)
    }
    console.log(localStorage.getItem("user"))
    if (authStore.currentUser != null) {
        router.push("/admin")
    }
})



</script>