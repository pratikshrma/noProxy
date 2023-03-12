<template>
    <div>
        <select>
            <!-- <option v-for="session in sessions">1</option> -->
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <!-- <div class="StudentCard">
            <div class="student" v-for="(student, index) in students" :key="index">
                <div class="info">
                    <div class="image"></div>
                    <div class="details">
                        <span class="name">{{ student.name }}</span>
                        <span class="rollno">Roll No. -{{ student.rollNo }}</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { collection, getDocs, query } from '@firebase/firestore';
import { db } from '../firebase';
var students = ref([])
const sessions = ref([])
const currentSession = ref("")
const semester = ref("")
const year = ref()
watchEffect(async () => {
    const SnapshotSession = await getDocs(collection(db, "sessions"));
    SnapshotSession.forEach((doc) => {
        sessions.value.push({ id: doc.id, ...doc.data() });
    });

    const SnapshotCurrentSession = await getDocs(
        collection(db, "currentSession")
    );
    SnapshotCurrentSession.forEach((doc) => {
        currentSession.value = { id: doc.id, ...doc.data() };
        const sessionYear = currentSession.value.current.split("-");
        const sessionYearI = parseInt(sessionYear[0]);
        if (semester == "1" || semester == "2") {
            year.value = sessionYearI;
        } else if (semester == "3" || semester == "4") {
            year.value = sessionYearI - 1;
        } else {
            year.value = sessionYearI - 2;
        }
    });
    const StudenttQuery = query(collection(db, `students-${year.value}`))
    const querySnapshotStudents = await getDocs(StudenttQuery)
    querySnapshotStudents.forEach((doc) => {
        students.value.push({ id: doc.id, ...doc.data() })
    })
    console.log(students)
    console.log(sessions.value)
})
</script>

<style scoped>
* {
    font-family: var(--font-face);
}

.StudentCard {
    display: flex;
    flex-direction: column;
    padding: 3rem 3rem;
    gap: 2rem;
    flex-wrap: wrap;
    height: 15rem;
}

.student {
    background-color: #356D69;
    box-shadow: 1px 1px 4px #356D69;
    border: 1px solid white;
    height: auto;
    width: 25rem;
    border-radius: 40px;
    padding: 1rem 1rem;
}

.student:hover {
    scale: 1.025;
    cursor: pointer;
    transition: 0.1s ease-in-out;
}

.info {
    display: flex;
    align-items: center;
}

.image {
    height: 5rem;
    width: 5rem;
    border-radius: 100px;
    background-color: lavender;
}

.details {
    display: flex;
    flex-direction: column;
    color: white;
    margin-left: 2rem;

}

.name {
    font-weight: bolder;
    font-size: 30px;
}

.rollno {
    font-size: 16px;
    font-weight: lighter;
}
</style>