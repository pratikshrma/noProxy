<script setup>

import { db } from '../firebase'
import { collection, getDocs, where, query } from '@firebase/firestore';
import { ref } from 'vue';
import router from '../../router'

const semester=router.currentRoute.value.params.id

const subjects = ref([]);
const q =query(collection(db, "teachers"), where("semester", "==",`${semester}`))
getDocs(q).then((querySnapshot)=>{
 querySnapshot.forEach((doc) => {
  subjects.value.push({id:doc.id,...doc.data()})
 })
})


const getSubject=ref()
const showMonths=(sub)=>{
    getSubject.value=sub
}
</script>

<template>

    <div class="container">
       <div @click="showMonths(subject.subject)" class="subjects" v-for="subject in subjects" :key="subject.id">
        {{ subject.subject }}
       </div>
    </div>
</template>

<style scoped>
.container{
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