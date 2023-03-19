<template>
    <div class="checkAttendance">
        <div ref="blackBG" @click="closeMenu" class="blackscreen"></div>
        <div class="attendanceMenu">
            <div ref="showMenu" class="DiffSemesters">
                <div class="semester" v-for="sem in sems" :key="sem.id">
                    <RouterLink :to="`/attendance/${sem.id}`" class="routetoAttendence">
                        <span class="semText">{{ sem.name }}</span>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div ref="hide" @click="seeAttendance" class="attendance">Attendance</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
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
const hide = ref()
const seeAttendance = () => {
    showMenu.value.style.display = "flex"
    blackBG.value.style.display = "block"
    hide.value.style.display = "none"
}
const closeMenu = () => {
    showMenu.value.style.display = "none"
    blackBG.value.style.display = "none"
    hide.value.style.display = "flex"
}
</script>

<style  scoped>
.checkAttendance {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

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
    height: 3rem;
    width: 7rem;
    border-radius: 15px;
    border: 1px solid #ff9820;
    font-size: 18px;
    box-shadow: 1px 1px 10px #0d2726;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    margin-right: 5rem;
    display: none;
}

.attendance:hover {
    border: 1px solid white;
    scale: 1.1;
    box-shadow: 0px 0px 7px white;
    cursor: pointer;
    transition: .2s ease-in-out;
}

@media screen and (max-width:1365px) {

    .DiffSemesters {
        position: absolute;
        flex-direction: column;
        top: -1rem;
        justify-content: flex-start;
        gap: 0.5rem;
        left: 50%;
        background-color: lavender;
        padding-top: 5rem;
        height: 44.5rem;
        display: none;
    }

    .semester:hover {
        scale: 1;
    }

    .semText {
        color: black;
        border-radius: 0px;
        border: none;
    }

    .semText::after {
        content: 'ester           '
    }

    .semText:hover {
        background: teal;
        color: white;
        transition: .2s ease-in-out;
    }

    .attendance {
        display: flex;
        font-size: .9rem;
        padding: 0 1rem;
        margin-left: -2rem;
    }

    .blackscreen {
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        opacity: 0.8;
        width: 50%;
        height: 100vh;
        display: none;
    }

    .checkAttendance {
        width: 57%;
    }
}
</style>