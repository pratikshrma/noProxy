import { defineStore } from "pinia";
import { auth } from "@/firebase";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        currentUser: "",
        loading: false,
    }),
    actions: {
        async signup(email, password) {
            console.log("This is signup Function");
            return auth
                .createUserWithEmailAndPassword(email, password)
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage);
                });
        },
        async signin(email, password) {
            console.log("Signin function triggerend");
            this.loading = true;
            await auth
                .signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode, errorMessage);
                    return false;
                });
            const unsubscibe = auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                localStorage.setItem("user", user);
            });
            unsubscibe();
            this.loading = false;
            return true;
        },
        async logout() {
            this.loading = true;
            await auth.signOut().catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
                return false;
            });
            const unsubscibe = auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                localStorage.removeItem("user");
            });
            unsubscibe();
            this.loading = false;
            return true;
        },
    },
});
