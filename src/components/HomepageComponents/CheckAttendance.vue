<template>
    <div class="checkAttendance">
        <div class="DiffSemesters">
            <div class="semester" v-for="sem in sems" :key="sem.id">
                <RouterLink :to="`/attendance/${sem.id}`" class="routetoAttendence">
                    <span class="semText">{{ sem.name }}</span>
                </RouterLink>

            </div>
        </div>
    </div>
</template>

<script setup>
const sems = [
    { name: "1st sem", id: 1 },
    { name: "2nd sem", id: 2 },
    { name: "3rd sem", id: 3 },
    { name: "4th sem", id: 4 },
    { name: "5th sem", id: 5 },
    { name: "6th sem", id: 6 }

]
</script>

<style  scoped>
.checkAttendance {
    font-family: var(--font-face);
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    margin-left: 3rem;
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
</style>