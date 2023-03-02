"use strict";

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AttendancePage from "../views/AttendancePage.vue";
import TeacherLogin from "../views/TeacherLogin.vue";
import CheckLeaves from "../views/CheckLeaves.vue";
import ApplyLeaves from "../views/ApplyLeaves.vue";
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
            path: "/teacherlogin",
            name: "teacherlogin",
            component: TeacherLogin,
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
    ],
});

router.beforeEach((to, from) => {
    if (to.meta.loginRequired) {
        if (localStorage.getItem("user") == "null") {
            router.push("/teacherlogin");
        }
    }
});
export default router;
