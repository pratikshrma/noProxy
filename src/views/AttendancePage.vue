<script setup>
import CollegeSubjects from "../components/Attendancepagecomponents/CollegeSubjects.vue"
import { db } from '../components/firebase'
import { collection, getDocs ,getDoc, where, query } from '@firebase/firestore';
import { ref , watch } from 'vue';
import router from '../router'
import StudentCard from '../components/Attendancepagecomponents/StudentsCard.vue'
import { async } from "@firebase/util";

const sessions = ref([]);
const q =query(collection(db, "sessions"))
getDocs(q).then((querySnapshot)=>{
 querySnapshot.forEach((doc) => {
  sessions.value.push({id:doc.id,...doc.data()})
 })
})

let currSession=ref("")
const CS =collection(db, "currentSession")
getDocs(CS).then((querySnapshot)=>{
 querySnapshot.forEach( (doc) => {
    currSession.value= doc.data().current
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
        <CollegeSubjects />
        <StudentCard v-if="currSession" :Session="currSession" /> 
    </div>
</template>

<style scoped>
.designSelect{
    margin:3rem 0 0 40rem ;
    height:3rem;
    width:40rem;
    border-radius: 50px;
    border: 1px solid teal;
    background-color: #ddd;
    color: red;
    padding: .5rem 1rem;
    font-size: 15px;
    text-align: center;
}
</style>