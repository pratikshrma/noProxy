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
                });
            const unsubscibe = auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                localStorage.setItem("user", user);
            });
            unsubscibe();
            console.log(this.currentUser);
            this.loading = false;
        },
        async logout() {
            this.loading = true;
            await auth.signOut().catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });
            const unsubscibe = auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                localStorage.removeItem("user");
            });
            unsubscibe();
            console.log(this.user);

            this.loading = false;
        },
    },
});

// export const useAuthStore = defineStore("authStore", () => {
//     const currentUser = ref(0);
//     const loading = ref(false);

//     async function signup(email, password) {
//         try {
//             loading.value = true;
//             return await auth.createUserWithEmailAndPassword(email, password);
//         } catch (error) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             console.log(errorCode, errorMessage);
//         }
//     }
//     async function signin(email, password) {
//         try {
//             loading.value = true;
//             return await auth.signInWithEmailAndPassword(email, password);
//         } catch (error) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             console.log(errorCode, errorMessage);
//         }
//     }
//     async function logout() {
//         try {
//             loading.value = true;
//             return await auth.signOut();
//         } catch (error) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//             console.log(errorCode, errorMessage);
//         }
//     }
//     const stateChange = () => {
//         const unsubscibe = auth.onAuthStateChanged((user) => {
//             currentUser.value = user;
//         });
//         unsubscibe();
//     };
//     stateChange();
//     loading.value = false;

//     return { currentUser, loading, signin, signup, logout };
// });
