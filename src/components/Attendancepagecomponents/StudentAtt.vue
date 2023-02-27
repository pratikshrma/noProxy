

<script setup>
import { defineProps } from 'vue';
import { collection, getDocs,getDoc, where, query, doc } from '@firebase/firestore'
import { db } from '../firebase'
import { ref,watchEffect } from 'vue';
import { async } from '@firebase/util';

const Attendance=ref([])
const props=defineProps({
    FingerPrint:String,
    subjects: String
})
let SelectedSubject=props.subjects
let fID=props.FingerPrint
watchEffect(async () =>{
    const AttendanceQuery =query(collection(db,"2022-2023"),where("fid","==",`${fID}`),where("subject","==",`${SelectedSubject}`))
 const querySnapshotAttendance=await getDocs(AttendanceQuery)
 querySnapshotAttendance.forEach((doc) => {
  Attendance.value.push({id:doc.id,...doc.data()})
  console.log(Attendance.value.id)
 })
})

let present="p"
let absent="a"

</script>

<template>
    <div class="outerBlock">   
        <div class="block" v-for="Att in Attendance" :key="Att.id">
            <div class="attendance">
                <span class="date">{{ Att.time.seconds }}</span>
                <span v-if="Att.status == present" class="present">{{ Att.status }}</span>
                <span v-if="Att.status == absent" class="absent">{{ Att.status }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.block{
    padding: 1rem 1rem;
}
.present{
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    padding:0.5rem 0.75rem;
    height: 1rem;
    width:1rem;
    background-color:#7FE95A;
    border:1px solid white;
    border-radius: 100px;
    margin-left: 1rem;
    color: darkgreen;
    -webkit-text-stroke: 1px teal;
}
.absent{
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    padding:0.5rem 0.75rem;
    height: 1rem;
    width:1rem;
    background-color:E34242;
    border:1px solid white;
    border-radius: 100px;
    margin-left: 1rem;
    color: darkred;
    -webkit-text-stroke: 1px teal;
}
.date{
    color: white;
}
</style>