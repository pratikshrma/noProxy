<template>
    <div class="outerBlock">   
        <div v-for="Att in Attendance" :key="Att.id">
            {{ Att.subject }}
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { collection, getDocs,getDoc, where, query, doc } from '@firebase/firestore'
import { db } from '../firebase'
import { ref } from 'vue';

const Attendance=ref([])
const props=defineProps({
    FingerPrint:String,
})
let fID=props.FingerPrint
const q =query(collection(db,"2022-2023"),where("fid","==",`${fID}`))
getDocs(q).then((querySnapshot)=>{
 querySnapshot.forEach((doc) => {
  Attendance.value.push({id:doc.id,...doc.data()})
 })
})

</script>

<style scoped>
.outerBlock{
    background-color: pink;
}
</style>