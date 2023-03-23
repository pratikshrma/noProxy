<script setup>
import { collection, getDocs, where, query, orderBy, limit } from '@firebase/firestore'
import { db } from '../../firebase'
import { ref, watchEffect } from 'vue';

const props = defineProps({
    FingerPrint: String,
    subjects: String,
    months: String,
    time: {
        seconds: String,
        nanoseconds: String,
    }
})
let selectedSubject = props.subjects
let selectedMonths = props.months
let fID = props.FingerPrint
let createdAt = props.time
let Attendance = ref([])
let totalPresent = 0
let totalAbsent = 0
let totalLeaves = 0
const loading = ref(true)

// 
watchEffect(async () => {
    loading.value = true
    //Fetching RAW Dates from from Firestore
    let RawAttendance = []
    const AttendanceQuery = query(collection(db, "2022-2023"), where("fid", "==", `${fID}`), where("subject", "==", `${selectedSubject}`), where("month", "==", `${selectedMonths}`), orderBy("time"))
    const querySnapshotAttendance = await getDocs(AttendanceQuery)
    querySnapshotAttendance.forEach((doc) => {
        var timestamp = doc.data().time
        var datetime = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
        RawAttendance.push({
            date: {
                d: datetime.getDate(),
                m: datetime.getMonth() + 1,
                y: datetime.getFullYear()
            },
            status: doc.data().status
        })
    })
    let uniqueAttendence = []
    function presentInUniqueAttendance(value) {
        for (let i = 0; i < uniqueAttendence.length; i++) {
            const e = uniqueAttendence[i];
            if (e.date.d === value.date.d && e.date.m === value.date.m && e.date.y === value.date.y) {
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
    if (uniqueAttendence.length < 1) {
        //Fetch a single record just for date in case a student has no attendence
        const AttendanceQuery = query(collection(db, "2022-2023"), where("subject", "==", `${selectedSubject}`), where("month", "==", `${selectedMonths}`), limit(1))
        const querySnapshotAttendance = await getDocs(AttendanceQuery)
        querySnapshotAttendance.forEach((doc) => {
            var timestamp = doc.data().time
            var datetime = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
            uniqueAttendence.push({
                date: {
                    d: datetime.getDate(),
                    m: datetime.getMonth() + 1,
                    y: datetime.getFullYear()
                },
                status: 'A'
            })
        })
        //now if even after the the unique attendence array is empty then there is no hope just show that no Attendence
    }
    if (uniqueAttendence.length < 1) {
        loading.value = false
        return
    }
    let month = uniqueAttendence[uniqueAttendence.length - 1].date.m
    let year = uniqueAttendence[uniqueAttendence.length - 1].date.y

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

    const dateTime = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000)
    let startDate = dateTime.getDate()


    //we can also do this with map will probably do that later

    //constructing the final Attendence array
    /*
        P -> Present
        A -> Absent
        H -> Sunday/Holidays
        L -> Leave
        */
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = startDate; i <= lastDate; i++) {
        let currentDate = `${i}/${month}/${year}`
        const d = new Date(year, month - 1, i);
        let dayOfTheWeek = weekday[d.getDay()];
        let result = presentInUniqueAttendance({
            date: {
                d: i,
                m: month,
                y: year
            }
        })
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
                    date: {
                        d: i,
                        m: month,
                        y: year
                    },
                    status: 'S',
                    dayOfTheWeek: dayOfTheWeek
                })
            } else {
                Attendance.value.push({
                    date: {
                        d: i,
                        m: month,
                        y: year
                    },
                    status: 'A',
                    dayOfTheWeek: dayOfTheWeek
                })
                totalAbsent += 1
                //this is a test
            }
        }
    }
    loading.value = false
})


</script>

<template>
    <div class="outerBlock">
        <div class="totals">
            <p class="totalPresent"><span> {{ totalPresent }}</span></p>
            <p class="totalAbsents"><span>{{ totalAbsent }}</span></p>
            <p class="totalleaves"><span> {{ totalLeaves }}</span></p>
        </div>
        <div v-if="loading">
            <h2>Loading</h2>
        </div>
        <div v-else>
            <div class="block" v-for="Att in Attendance" :key="Att.id" v-if="Attendance.length > 1">
                <div class="attendance">
                    <div class="time">
                        <span class="date">{{ Att.date.d }}/{{ Att.date.m }}/{{ Att.date.y }}</span>
                        <span class="date">{{ Att.dayOfTheWeek }}</span>
                    </div>
                    <span class="absent" v-if="Att.status == 'A'">A</span>
                    <span class="present" v-else-if="Att.status != 'S' && Att.status != 'A'">P</span>
                    <span class="sunday" v-else>H</span>
                </div>
            </div>
            <div v-else>No Attendence This Month</div>
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
    height: 5rem;
    width: 5rem;
    background: url(/totalPresents.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalPresent span {
    font-size: 25px;
    margin-top: .7rem;
}

.totalAbsents {
    color: white;
    height: 5rem;
    width: 5rem;
    background: url(/totalAbsents.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalAbsents span {
    font-size: 25px;
    margin-top: .7rem;
}

.totalleaves {
    color: white;
    height: 5rem;
    width: 5rem;
    background: url(/totalLeaves.svg);
    background-size: cover;
    display: flex;
    justify-content: center;
    justify-content: center;
}

.totalleaves span {
    font-size: 25px;
    margin-top: .7rem;
}

@media screen and (max-width:890px) {
    .totalPresent {
        height: 2.5rem;
        width: 2.5rem;
    }

    .totalPresent span {
        font-size: 15px;
        margin-top: .4rem;
    }

    .totalleaves {
        height: 2.5rem;
        width: 2.5rem;
    }

    .totalleaves span {
        font-size: 15px;
        margin-top: .4rem;
    }

    .totalAbsents {
        height: 2.5rem;
        width: 2.5rem;
    }

    .totalAbsents span {
        font-size: 15px;
        margin-top: .4rem;
    }

    .date {
        font-size: 14px;
    }

    .present {
        height: 1rem;
        width: 1rem;
        font-size: 12px;
        padding: .2rem .2rem;
    }

    .absent {
        height: 1rem;
        width: 1rem;
        font-size: 12px;
        padding: .2rem .2rem;
    }

    .sunday {
        height: 1rem;
        width: 1rem;
        font-size: 12px;
        padding: .2rem .2rem;
    }
}
</style>
