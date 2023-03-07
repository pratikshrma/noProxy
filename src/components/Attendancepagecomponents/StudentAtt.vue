

<script setup>
// import { defineProps } from 'vue';
import { collection, getDocs, where, query, orderBy } from '@firebase/firestore'
import { db } from '../../firebase'
import { ref, watchEffect, computed } from 'vue';


const props = defineProps({
    FingerPrint: String,
    subjects: String,
    months: String
})
let SelectedSubject = props.subjects
let selectedMonths = props.months
let fID = props.FingerPrint
const Attendance = ref([])
let totalPresent = 0
let totalAbsent = 0
let totalLeaves = 0



watchEffect(async () => {
    //Fetching RAW Dates from from Firestore
    let RawAttendance = []
    const AttendanceQuery = query(collection(db, "2022-2023"), where("fid", "==", `${fID}`), where("subject", "==", `${SelectedSubject}`),
        where("month", "==", `${selectedMonths}`), orderBy("time"))
    const querySnapshotAttendance = await getDocs(AttendanceQuery)
    querySnapshotAttendance.forEach((doc) => {
        var timestamp = doc.data().time
        var datetime = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
        const date = datetime.toLocaleDateString()
        RawAttendance.push({
            date: date,
            status: doc.data().status
        })
    })

    //Filtering Unique Dates
    let uniqueAttendence = []
    function presentInUniqueAttendance(value) {
        for (let i = 0; i < uniqueAttendence.length; i++) {
            const e = uniqueAttendence[i];
            if (e.date === value.date) {
                return e;
            }
        }
        return false;
    }
    for (let i = 0; i < RawAttendance.length; i++) {
        const a = RawAttendance[i];
        const data = {
            date: a.date,
            status: a.status,
        }
        if (presentInUniqueAttendance(data) === false) {
            uniqueAttendence.push(data);
        }
    }
    const [date, month, year] = uniqueAttendence.length > 0 ? uniqueAttendence[uniqueAttendence.length - 1].date.split('/') : new Date().toLocaleDateString().split('/');


    //Sunday Logic
    function getAllSundays(m, y) {
        var year = y;
        var month = m - 1;
        var sundays = [];
        for (var i = 0; i <= new Date(year, month, 0).getDate(); i++) {
            var date = new Date(year, month, i);
            if (date.getDay() == 0) {
                sundays.push(date.getDate());
            }
        };
        return sundays
    }
    function isASunday(date) {
        for (let i = 0; i < sundays.length; i++) {
            const element = sundays[i];
            if (element == date) {
                return true;
            }
        }
        return false
    }
    const sundays = getAllSundays(month, year)
    let lastDate;
    const currentMonth = new Date().getMonth();
    if (month == currentMonth + 1) {
        lastDate = new Date().getDate()
    } else {
        lastDate = new Date(year, month, 0).getDate();
    }


    //we can also do this with map will probably do that later

    //constructing the final Attendence array
    /*
        P -> Present
        A -> Absent
        S -> Sunday
        L -> Leave
        */
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 1; i <= lastDate; i++) {
        let currentDate = `${i}/${month}/${year}`
        const d = new Date(year, month - 1, i);
        let dayOfTheWeek = weekday[d.getDay()];
        let result = presentInUniqueAttendance({ date: currentDate })
        if (result) {
            Attendance.value.push({
                ...result,
                dayOfTheWeek: dayOfTheWeek
            })
            if (result.status == 'p' || result.status == 'P') //there is some inconsistancy in data some status are 'p' and some are 'P' or condition will not be required in the final version
                totalPresent += 1
            else if (result.status == 'l')
                totalLeaves += 1

        } else {
            if (isASunday(i)) {
                Attendance.value.push({
                    date: currentDate,
                    status: 'S',
                    dayOfTheWeek: dayOfTheWeek
                })
            } else {
                Attendance.value.push({
                    date: currentDate,
                    status: 'A',
                    dayOfTheWeek: dayOfTheWeek
                })
                totalAbsent += 1
            }
        }
    }

})

</script>

<template>
    <div class="outerBlock">
        <div class="totals">
            <p class="totalPresent"><span> {{ totalPresent }}</span></p>
            <p class="totalAbsents"><span>{{ totalAbsent }}</span></p>
            <p class="totalleaves"><span> {{ totalLeaves }}</span></p>
        </div>
        <div class="block" v-for="Att in Attendance" :key="Att.id">
            <div class="attendance">
                <div class="time">
                    <span class="date">{{ Att.date }}</span>
                    <span class="date">{{ Att.dayOfTheWeek }}</span>
                </div>
                <span class="absent" v-if="Att.status == 'A'">A</span>
                <span class="present" v-else-if="Att.status != 'S' && Att.status != 'A'">P</span>
                <span class="sunday" v-else>H</span>
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
    -webkit-text-stroke: 1px #356D69;
    display: flex;
    justify-content: center;
    align-items: center;
}


.date {
    font-size: 23px;
    color: white;
}

.sunday {
    text-transform: uppercase;
    font-size: 20px;
    height: 2rem;
    width: 2rem;
    background-color: aqua;
    border: 1px solid white;
    border-radius: 100px;
    margin-left: 1rem;
    color: blue;
    -webkit-text-stroke: 1px #356D69;
    display: flex;
    justify-content: center;
    align-items: center;
}

.absent {
    text-transform: uppercase;
    font-size: 20px;
    height: 2rem;
    width: 2rem;
    background-color: #E34242;
    border: 1px solid white;
    border-radius: 100px;
    margin-left: 1rem;
    color: white;
    /* -webkit-text-stroke: 1px white; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.time {
    display: flex;
    flex-direction: column;
}

.totals {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1rem;

}

.totalPresent {
    color: white;
    height: 4rem;
    width: 4rem;
    background: url(/totalPresents.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalPresent span {
    font-size: 20px;
    margin-top: .6rem;
}

.totalAbsents {
    color: white;
    height: 4rem;
    width: 4rem;
    background: url(/totalAbsents.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalAbsents span {
    font-size: 20px;
    margin-top: .6rem;
}

.totalleaves {
    color: white;
    height: 4rem;
    width: 4rem;
    background: url(/totalLeaves.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalleaves span {
    font-size: 20px;
    margin-top: .6rem;
}
</style>
