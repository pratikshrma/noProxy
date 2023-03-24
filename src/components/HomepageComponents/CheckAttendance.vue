<template>
    <div class="checkAttendance">
        <div ref="blackBG" @click="closeMenu" class="blackscreen"></div>
        <div class="attendanceMenu">
            <div ref="showMenu" class="DiffSemesters">
                <span class="menuHeading">Please select a Semester :</span>
                <div class="semester" v-for="sem in sems" :key="sem.id">
                    <RouterLink :to="`/attendance/${sem.id}`" class="routetoAttendence">
                        <span class="semText">{{ sem.name }}</span>
                    </RouterLink>
                </div>
            </div>
            <img ref="hamMenu" @click="seeAttendance" src="/menu-icon2.png" class="attendance" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../../router'
import { watch } from 'vue';
import { onMounted } from 'vue';
watch(() => router.currentRoute.value.params, () => {
    showMenu.value.style.display = "none"
    blackBG.value.style.display = "none"
    hamMenu.value.style.display = "flex"
    document.body.style.height = "unset"
    document.body.style.overflow = "unset"
})
onMounted(() => {
    document.body.style.height = "unset"
    document.body.style.overflow = "unset"
})
const sems = [
    { name: "1st sem", id: 1 },
    { name: "2nd sem", id: 2 },
    { name: "3rd sem", id: 3 },
    { name: "4th sem", id: 4 },
    { name: "5th sem", id: 5 },
    { name: "6th sem", id: 6 }
]
const showMenu = ref()
const blackBG = ref()
const hamMenu = ref()
const mainContainer = ref()

const seeAttendance = () => {
    showMenu.value.style.display = "flex"
    blackBG.value.style.display = "block"
    hamMenu.value.style.display = "none"
    document.body.style.height = "100%"
    document.body.style.overflow = "hidden"
}
const closeMenu = () => {
    showMenu.value.style.display = "none"
    blackBG.value.style.display = "none"
    hamMenu.value.style.display = "flex"
    document.body.style.height = "unset"
    document.body.style.overflow = "unset"
}
</script>

<style  scoped>
.checkAttendance {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;

}

.attendanceMenu {
    font-family: var(--font-face);
    padding: 1rem 1rem;
    display: flex;
    width: 100%;
    margin-left: 3rem;
    padding-right: 5rem;
}

.DiffSemesters {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin-top: 1rem;

}

.routetoAttendence {
    text-decoration: none;

}

.semester {
    padding: 1rem 1rem;
}

.semester:hover {
    scale: 1.1;
    transition: .2s ease-in-out;
}

.semText {
    font-size: 1.2rem;
    color: white;
    padding: 1rem 1rem;
    border-radius: 100px;
    border: 1px solid white;
}

.semText:hover {
    background-color: white;
    color: black;
    transition: .2s ease-in-out;
}

.attendance {
    height: 3.5rem;
    width: 4rem;
    display: none;

}

.attendance:hover {
    scale: 1.2;
    cursor: pointer;
    transition: .2s ease-in-out;
}

@media screen and (max-width: 1410px) {
    .semester {
        padding: 0 0;
    }

    .semText {
        font-size: 1rem;
        padding: .5rem .5rem;
    }
}

.menuHeading {
    display: none;
}

@media screen and (max-width:890px) {

    .DiffSemesters {
        position: absolute;
        flex-direction: column;
        width: 50%;
        top: -1rem;
        justify-content: flex-start;
        gap: 3rem;
        right: 0;
        background-color: teal;
        padding: 5rem 1rem;
        height: 100vh;
        display: none;
    }

    .menuHeading {
        color: white;
        display: block;
    }


    .semText {
        color: white;
        border-radius: 10px;
        padding: 1rem .5rem;
        /* border: 1px double white; */
        border: none;
    }

    .semText::after {
        content: 'ester           '
    }

    .semText:hover {
        scale: 1;
        border: none;
        background-color: rgb(255, 255, 255, 0.5);
        border-bottom: 3px solid white;
        transition: .2s ease-in-out;
    }

    .semester:hover {
        scale: 1;
        padding: 0 0;
    }

    .attendance {
        display: flex;
        position: relative;
        font-size: .9rem;
        padding: 0 0;
        margin-left: -1rem;
    }

    .attendanceMenu {
        padding: 1rem 0;
    }

    .blackscreen {
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        opacity: 0.8;
        width: 50%;
        height: 100%;
        display: none;
    }

    .checkAttendance {
        width: auto;
    }
}
</style>