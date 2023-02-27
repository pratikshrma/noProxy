<script setup>
import { db } from "../components/firebase";
import { collection, getDocs, getDoc, where, query } from "@firebase/firestore";
import { ref, watchEffect,watch } from "vue";
import router from "../router";
import StudentAtt from '../components/Attendancepagecomponents/StudentAtt.vue'
import { async } from "@firebase/util";

const semester = router.currentRoute.value.params.id;
const sessions = ref([]); //Stores the Sessions
const currentSession = ref(""); //Store the current Session
const year = ref(); //Calculate the Year based on Semester selected in Home Page
const subjects = ref([]);
const students= ref([]);

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

  // fetch Subjects
  const SubjectQuery = query(
    collection(db, "teachers"),
    where("semester", "==", `${semester}`)
  );
  const querySnapshotSubject = await getDocs(SubjectQuery);
  querySnapshotSubject.forEach((doc) => {
    subjects.value.push({ id: doc.id, ...doc.data() });
  });
})

// fetch Students

watch(year,async ()=>{
  const StudenttQuery = query(collection(db,`students-${year.value}`))
const querySnapshotStudents = await getDocs(StudenttQuery)
 querySnapshotStudents.forEach((doc) => {
  students.value.push({id:doc.id,...doc.data()})
 })
})

// Select Subject

let getSubjects = ref();

const showSubject = (sub,index) => {
  getSubjects.value=sub
}
// show attendance component 
watch(getSubjects,()=>{
  finger.value=[""]
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
  <div id="AttendancePage">
    <div class="selectYear">
      <select class="designSelect">
        <option
          class="sessionName"
          v-for="session in sessions"
          :key="session.id"
        >
          {{ session.session }}
        </option>
      </select>
    </div>

    <!-- subjects -->

    <div class="CollegeSubjects">
      <div
        @click="showSubject(subject.subject)"
        class="subjects"
        v-for="subject in subjects"
        :key="subject.id"
      >
        {{ subject.subject }}
      </div>
    </div>

    <!-- Students List -->

    <div class="StudentCard">
      <div
        class="student"
        @click="ShowAtt(student.fid, index)"
        v-for="(student, index) in students"
        :key="index"
      >
        <div class="info">
          <div class="image"></div>
          <div class="details">
            <span class="name">{{ student.name }}</span>
            <span class="rollno">Roll No. -{{ student.rollNo }}</span>
            <span class="rollno">FingerID -{{ student.fid }}</span>
          </div>
        </div>
        <StudentAtt v-if="finger[index] && getSubjects" 
        :FingerPrint="finger[index]"
        :subjects="getSubjects" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.designSelect {
  margin: 3rem 0 0 40rem;
  height: 3rem;
  width: 40rem;
  border-radius: 50px;
  border: 1px solid teal;
  background-color: #ddd;
  color: red;
  padding: 0.5rem 1rem;
  font-size: 15px;
  text-align: center;
}
.CollegeSubjects {
  display: flex;
  height: auto;
  gap: 4rem;
  justify-content: space-evenly;
  padding-top: 1rem;

}
.subjects {
  height: 5rem;
  background-color: teal;
  font-size: 20px;
  padding: 1rem 1rem;
  border-radius: 50px;
  color: white;
  box-shadow: 1px 1px 4px teal;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.subjects:hover {
  scale: 1.1;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.StudentCard {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  height: 25rem;
}
.student {
  background-color: teal;
  box-shadow: 1px 1px 4px teal;
  border: 1px solid white;
  height: auto;
  width: 10rem;
  border-radius: 20px;
  padding: 1rem 2rem;
}
.student:hover {
  scale: 1.1;
  cursor: pointer;
  transition: 0.1s ease-in-out;
}
.info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.image {
  height: 2rem;
  width: 2rem;
  border-radius: 100px;
  background-color: lavender;
}
.details {
  display: flex;
  flex-direction: column;
  color: white;
}
.name {
  font-weight: bolder;
}
.rollno {
  font-size: 10px;
}
</style>
