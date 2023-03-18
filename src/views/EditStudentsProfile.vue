<template>
    <div v-if="loading">Loading Please Wait</div>
    <div v-else>
        change sessions->
        <button v-for="session in sessions" @click="changeSession(session)">{{ session.session }}</button>
        Select Year ->
        <button @click="changeCurrentYear(1)">1</button>
        <button @click="changeCurrentYear(2)">2</button>
        <button @click="changeCurrentYear(3)">3</button>
        <div>
            <div class="StudentCard">
                <div class="student" v-for="(student, index) in students" :key="index">
                    <div class="info">
                        <div v-if="student.image" class="image"><img :src="student.image" alt="Student Image"
                                style="height: 100px;width: 100px;"></div>
                        <div v-else>No Image</div>
                        <div class="details">
                            <span class="name">{{ student.name }}</span>
                            <span class="rollno">Roll No. - {{ student.rollNo }}</span>
                        </div>
                    </div>
                    <input type="file" @change="handleUpload($event, student.rollNo)">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, watch } from 'vue';
import { collection, getDocs, query, where, setDoc, doc } from '@firebase/firestore';
import { db, storage } from '../firebase';
var loading = ref(true)
var students = ref([])
const sessions = ref([])
const currentSession = ref("")
const year = ref()
watchEffect(async () => {
    loading.value = true
    const SnapshotSession = await getDocs(collection(db, "sessions"));
    SnapshotSession.forEach((doc) => {
        sessions.value.push({ id: doc.id, ...doc.data() });
    });

    const SnapshotCurrentSession = await getDocs(
        collection(db, "currentSession")
    );
    SnapshotCurrentSession.forEach((doc) => {
        const tempSession = { id: doc.id, ...doc.data() }
        currentSession.value = tempSession.current;
        const sessionYear = currentSession.value.split("-");
        const sessionYearI = parseInt(sessionYear[0]);
        year.value = sessionYearI
    });
    fetchStudents()
    loading.value = false
    console.log(currentSession.value)
})
async function fetchStudents() {
    loading.value = true
    students.value = []
    const StudentQuery = query(collection(db, `students-${year.value}`))
    const querySnapshotStudents = await getDocs(StudentQuery)
    querySnapshotStudents.forEach((doc) => {
        students.value.push({ id: doc.id, ...doc.data() })
    })
    loading.value = false
}
watch([year, currentSession], () => {
    fetchStudents()
})
function changeSession(session) {
    currentSession.value = session.session
    console.log(currentSession.value)
    const sessionYear = currentSession.value.split("-");
    const sessionYearI = parseInt(sessionYear[0]);
    year.value = sessionYearI
    console.log(currentSession)
}
function changeCurrentYear(selectedYear) {
    const sessionYear = currentSession.value.split("-");
    const sessionYearI = parseInt(sessionYear[0]);
    if (selectedYear == 1) {
        year.value = sessionYearI
    }
    else if (selectedYear == 2) {
        year.value = sessionYearI - 1
    } else if (selectedYear == 3) {
        year.value = sessionYearI - 2
    }
    console.log(year.value)
}
async function handleUpload(e, rollno) {
    const file = e.target.files[0];
    console.log(file)
    const uploadTask = storage.ref(`students-${year.value}/${file.name}`).put(file)

    /*
    *****Compress the photo if they are too big will probably do that later
    */

    uploadTask.on(
        "state-changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        },
        (error) => { console.log(error) },
        () => {
            // just listening for the file to upload successfullly
            console.log("File Uploaded Succesfullu")
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                const studentQuery = query(collection(db, `students-${year.value}`), where("rollNo", "==", rollno))
                const querySnapShot = await getDocs(studentQuery)
                querySnapShot.forEach(async document => {
                    console.log(document.id)
                    await setDoc(doc(db, `students-${year.value}`, `${document.id}`), {
                        ...document.data(),
                        image: url
                    });
                })
                fetchStudents()
            })
        }
    )
}
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