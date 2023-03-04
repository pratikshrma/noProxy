

<script setup>
// import { defineProps } from 'vue';
import { collection, getDocs, getDoc, where, query, doc } from '@firebase/firestore'
import { db } from '../../firebase'
import { ref, watchEffect, computed } from 'vue';


const Attendance = ref([])
const props = defineProps({
    FingerPrint: String,
    subjects: String
})
let SelectedSubject = props.subjects
let fID = props.FingerPrint
var uniqueAttendence = computed(() => {
    let result = [];
    function presentInUniqueAttendence(value) {
        for (let i = 0; i < result.length; i++) {
            const e = result[i];
            if (e.date === value.date) {
                return true;
            }
        }
        return false;
    }
    for (let i = 0; i < Attendance.value.length; i++) {
        const a = Attendance.value[i];
        const data = {
            date: a.date,
            status: a.status,
        }
        if (presentInUniqueAttendence(data) === false) {
            result.push(data);
        }
    }
    return result;
});

watchEffect(async () => {
    const AttendanceQuery = query(collection(db, "2022-2023"), where("month", "==", "february"), where("fid", "==", `${fID}`), where("subject", "==", `${SelectedSubject}`))
    const querySnapshotAttendance = await getDocs(AttendanceQuery)
    querySnapshotAttendance.forEach((doc) => {
        var timestamp = doc.data().time
        var datetime = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
        const date = datetime.toLocaleDateString()
        Attendance.value.push({
            date: date,
            status: doc.data().status
        })
    })

})
// const modAttendence= Attendance.amp...
let present = "p"
let absent = "a"

let hello = "yo"

</script>

<template>
    <div class="outerBlock">
        <div class="block" v-for="Att in uniqueAttendence" :key="Att.id">
            <div class="attendance">
                <span class="date">{{ Att.date }}</span>
                <span v-if="Att.status == present" class="present">{{ Att.status }}</span>
                <span v-if="Att.status == absent" class="absent">{{ Att.status }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.block {
    padding: 1rem 1rem;

}

.attendance {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.present {
    text-transform: uppercase;
    font-size: 20px;
    height: 2rem;
    width: 2rem;
    background-color: #7FE95A;
    border: 1px solid white;
    border-radius: 100px;
    margin-left: 1rem;
    color: darkgreen;
    -webkit-text-stroke: 1px teal;
    display: flex;
    justify-content: center;
    align-items: center;
}


.date {
    font-size: 15px;
    color: white;
}
</style>