<script setup>
import { db } from '../components/firebase'
import { collection, getDocs ,getDoc, where, query } from '@firebase/firestore';
import { ref,watchEffect,reactive } from 'vue';
import router from '../router'
import StudentCard from '../components/Attendancepagecomponents/StudentsCard.vue'
import { useSubjectStore } from "../stores/counter";

const store=useSubjectStore()

const semester = router.currentRoute.value.params.id;
const sessions = ref([]); //Stores the Sessions
const currentSession = ref("") //Store the current Session
const year = ref() //Calculate the Year based on Semester selected in Home Page

watchEffect(async () => {
    const SnapshotSession = await getDocs(collection(db, "sessions"))
    SnapshotSession.forEach((doc) => {
        sessions.value.push({ id: doc.id, ...doc.data() })
    })

    const SnapshotCurrentSession = await getDocs(collection(db, "currentSession"))
    SnapshotCurrentSession.forEach((doc) => {
        currentSession.value = { id: doc.id, ...doc.data() }
        const sessionYear = currentSession.value.current.split("-")
        const sessionYearI = parseInt(sessionYear[0])
        if (semester == '1' || semester == '2') {
            year.value = sessionYearI
        } else if (semester == '3' || semester == '4') {
            year.value = sessionYearI - 1
        } else {
            year.value = sessionYearI - 2
        }
    })
})


</script>

<template>
    <div  id="AttendancePage">
        <div class="selectYear">
            <select class="designSelect">
                <option class="sessionName" v-for="session in sessions" :key="session.id">{{ session.session }}</option>
            </select>
        </div>

        <!-- subjects -->

        <div class="CollegeSubjects">
            <div @click="showSubject(subject.subject)" class="subjects" v-for="subject in store.subjects" :key="subject.id">
        {{ subject.subject }}
       </div>
        </div>
        <StudentCard v-if="year" :year="year" :subject="getSubjects"/> 
    </div>
</template>

<style scoped>
.designSelect {
    margin: 3rem 0 0 40rem;
    height: 3rem;
    width: 40rem;
    border-radius: 50px;
    border: 1px solid teal;
    background-color: #ddd;
    color: red;
    padding: .5rem 1rem;
    font-size: 15px;
    text-align: center;
}
.CollegeSubjects{
    display: flex;
    height: auto;
    gap:4rem;
    justify-content: space-evenly;
    padding-top: 1rem;
}
.subjects{
    height:5rem;
    background-color: teal;
    font-size: 20px;
    padding:1rem 1rem;
    border-radius: 50px;
    color:white;
    box-shadow: 1px 1px 4px teal;
    border:1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
}
.subjects:hover{
    scale:1.1;
    cursor: pointer;
    transition:.2s ease-in-out;
}
</style>