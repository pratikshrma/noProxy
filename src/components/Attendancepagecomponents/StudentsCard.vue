<script setup>
import { ref, defineProps} from 'vue';
import { collection, getDocs,getDoc, where, query, doc } from '@firebase/firestore'
import { db } from '../firebase'
import StudentAttendance from '../Attendancepagecomponents/StudentsCard.vue';
import router from '../../router'

const semester=router.currentRoute.value.params.id

const props=defineProps({
    year:String
})
console.log(props.value)
const students= ref([]);
const q =query(collection(db, "studens-2020"), where("enrollmentYear", "==",`${semester}`))
getDocs(q).then((querySnapshot)=>{
 querySnapshot.forEach((doc) => {
  students.value.push({id:doc.id,...doc.data()})
 })
})

let finger=ref([])
const ShowAtt=(Attendance,index)=>{
if (!finger.value[index]){
    finger.value[index]=Attendance
}
else{
    finger.value[index]=null
}
}
</script>

<template>
    <div class="containr">
        {{ year }}
        <!-- <div class="student" @click="ShowAtt(student.fid,index)" v-for="(student,index) in students" :key="index">
            <div class="info">
                <div class="image"></div>
                <div class="details">
                    <span class="name">{{ student.name }}</span>
                    <span class="rollno">Roll No. -{{ student.rollNo }}</span>
                    <span class="rollno">FingerID -{{ student.fid }}</span>
                </div>
            </div> -->
            <!-- <StudentAttendance v-if="finger[index]" :FingerPrint="finger[index]" /> -->
        <!-- </div> -->
    </div>
</template>

<style scoped>
    .containr{
        display: flex;
        flex-direction: column;
        padding: 2rem 2rem;
        gap:2rem;
        flex-wrap: wrap;
        height: 25rem;
    }
    .student{
        background-color: teal;
        box-shadow: 1px 1px 4px teal;
        border:1px solid white;
        height:auto;
        width:10rem;
        border-radius: 20px;
        padding:1rem 2rem;
    }
    .student:hover{
        scale:1.1;
        cursor: pointer;
        transition:.1s ease-in-out;
    }
    .info{
        display:flex;
        justify-content: space-evenly;
        align-items: center;
        
    }
    .image{
        height: 2rem;
        width:2rem;
        border-radius: 100px;
        background-color: lavender;
    }
    .details{
        display: flex;
        flex-direction: column;
        color:white;
    }
    .name{
        font-weight: bolder;
    }
    .rollno{
        font-size: 10px;
    }
</style>