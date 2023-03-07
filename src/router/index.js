"use strict";

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AttendancePage from "../views/AttendancePage.vue";
import Login from "../views/Login.vue";
import CheckLeaves from "../views/CheckLeaves.vue";
import ApplyLeaves from "../views/ApplyLeaves.vue";
import Admin from "../views/Admin.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/attendance/:id",
            name: "attendance",
            component: AttendancePage,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/applyleaves",
            name: "applyleaves",
            component: ApplyLeaves,
        },
        {
            path: "/checkleaves",
            name: "checkleaves",
            meta: {
                loginRequired: true,
            },
            component: CheckLeaves,
        },
        {
            path: "/admin",
            name: "admin",
            meta: {
                loginRequired: true,
            },
            component: Admin,
        },
    ],
});

router.beforeEach((to, from) => {
    if (to.meta.loginRequired) {
        if (localStorage.getItem("user") == "null") {
            router.push("/login");
        }
    }
});
export default router;
