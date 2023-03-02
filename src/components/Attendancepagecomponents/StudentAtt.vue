

<script setup>
// import { defineProps } from 'vue';
import { collection, getDocs, getDoc, where, query, doc } from '@firebase/firestore'
import { db } from '../../firebase'
import { ref, watchEffect } from 'vue';
import { async } from '@firebase/util';

const Attendance = ref([])
const props = defineProps({
    FingerPrint: String,
    subjects: String
})
let SelectedSubject = props.subjects
let fID = props.FingerPrint
// function formatDate(date) {
//     const formatDate = new Date(
//         date.seconds * 1000 + date.nanoseconds / 1000000
//     );
//     return formatDate.toLocaleTimeString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// }
watchEffect(async () => {
    const AttendanceQuery = query(collection(db, "2022-2023"), where("fid", "==", `${fID}`), where("subject", "==", `${SelectedSubject}`))
    const querySnapshotAttendance = await getDocs(AttendanceQuery)
    querySnapshotAttendance.forEach((doc) => {
        var timestamp = doc.data().time
        var datetime = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
        const DateString = datetime.toLocaleDateString()
        // var dta = {
        //     id: doc.id,
        //     ...doc.data()
        // }
        // dta = {
        //     ...dta,
        //     time: formatDate(dta.time)
        // }

        Attendance.value.push({ id: doc.id, date: DateString, ...doc.data() })
        // Attendance.value.push(dta)
    })
})

let present = "p"
let absent = "a"

let hello = "yo"

</script>

<template>
    <div class="outerBlock">
        <div class="block" v-for="Att in Attendance" :key="Att.id">
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