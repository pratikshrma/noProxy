<script setup>
import { db } from "@/firebase";
import { collection, getDocs, getDoc, where, query } from "@firebase/firestore";
import { ref, watchEffect, watch, onMounted } from "vue";
import router from "../router";
import StudentAtt from '../components/Attendancepagecomponents/StudentAtt.vue'
import Navbar from '../components/Navbar.vue'

const semester = router.currentRoute.value.params.id;
const sessions = ref([]); //Stores the Sessions
const currentSession = ref(""); //Store the current Session
const year = ref(); //Calculate the Year based on Semester selected in Home Page
const subjects = ref([]);
const students = ref([]);
const designSub = ref()
const designMon = ref()
const months = ref([])




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

  //fetch months


  if (semester == 1 || semester == 3 || semester == 5) {
    const monthQuery = query(
      collection(db, "months-2022-2023"),
      where("sessionType", "==", "S")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }
  else if (semester == 2 || semester == 4 || semester == 6) {
    const monthQuery = query(
      collection(db, "months-2022-2023"),
      where("sessionType", "==", "E")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }

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

watch(year, async () => {
  const StudenttQuery = query(collection(db, `students-${year.value}`))
  const querySnapshotStudents = await getDocs(StudenttQuery)
  querySnapshotStudents.forEach((doc) => {
    students.value.push({ id: doc.id, ...doc.data() })
  })
})


//select month

let getMonths = ref();

const showMonths = (mon, index) => {
  getMonths.value = mon
  let currentMon = designMon.value[index]
  for (let i = 0; i <= subjects.value.length - 1; i++) {
    if (designMon.value[i] == currentMon) {
      currentMon.style.backgroundColor = "teal"
      currentMon.style.border = "1px solid lavender"
      currentMon.style.color = "lavender"
      designMon.value[i].style.backgroundColor = "lavender"
      designMon.value[i].style.color = "teal"
      designMon.value[i].style.border = "1px solid teal"
    }
    else {
      currentMon.style.backgroundColor = "lavender"
      currentMon.style.border = "1px solid teal"
      currentMon.style.color = "teal"
      designMon.value[i].style.backgroundColor = "teal"
      designMon.value[i].style.color = "lavender"
      designMon.value[i].style.border = "1px solid lavender"
    }
  }
}

// Select Subject

let getSubjects = ref();

const showSubject = (sub, index) => {
  getSubjects.value = sub
  let currentSub = designSub.value[index]
  for (let i = 0; i <= subjects.value.length - 1; i++) {
    if (designSub.value[i] == currentSub) {
      currentSub.style.backgroundColor = "teal"
      currentSub.style.border = "1px solid lavender"
      currentSub.style.color = "lavender"
      designSub.value[i].style.backgroundColor = "lavender"
      designSub.value[i].style.color = "teal"
      designSub.value[i].style.border = "1px solid teal"
    }
    else {
      // currentSub.style.backgroundColor = "lavender"
      // currentSub.style.border = "1px solid teal"
      // currentSub.style.color = "teal"
      designSub.value[i].style.backgroundColor = "teal"
      designSub.value[i].style.color = "lavender"
      designSub.value[i].style.border = "1px solid lavender"
    }
  }
}
watch(getMonths, () => {
  finger.value = [""]
})
// show attendance component 
watch(getSubjects, () => {
  finger.value = [""]
})
let finger = ref([])
const ShowAtt = (Attendance, index) => {
  if (!finger.value[index]) {
    finger.value[index] = Attendance
  }
  else {
    finger.value[index] = null
  }
}
</script>

<template>
  <!-- FIRST HALF -->

  <div id="AttendancePage">
    <div class="attendanceTop">
      <Navbar />
      <p class="pageName">attendance</p>

      <!-- subjects -->

      <div class="CollegeSubjects">
        <div ref="designSub" @click="showSubject(subject.subject, index)" class="subjects"
          v-for="(subject, index) in subjects" :key="index">
          {{ subject.subject }}
        </div>
      </div>
    </div>

    <!-- SECOND HALF-->

    <div class="Attendancebottom">
      <!-- months -->
      <div class="CollegeSubjects">
        <div ref="designMon" class="subjects" @click="showMonths(month.month, index)" v-for="(month, index) in months"
          :key="index">
          {{ month.month }}
        </div>
      </div>


      <!-- Students List -->

      <div class="StudentCard">
        <div class="student" @click="ShowAtt(student.fid, index)" v-for="(student, index) in students" :key="index">
          <div class="info">
            <div class="image"></div>
            <div class="details">
              <span class="name">{{ student.name }}</span>
              <span class="rollno">Roll No. -{{ student.rollNo }}</span>
              <span class="rollno">FingerID -{{ student.fid }}</span>
            </div>
          </div>
          <StudentAtt v-if="finger[index] && getSubjects && getMonths" :FingerPrint="finger[index]"
            :subjects="getSubjects" :months="getMonths" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attendanceTop {
  background-image: url(/AttendanceImage.svg);
  height: 36.063rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pageName {
  color: lavender;
  font-size: 9rem;
  text-transform: capitalize;
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
  width: 20rem;
  text-transform: capitalize;
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
  width: 15rem;
  border-radius: 20px;
  padding: 1rem 1rem;
}

.student:hover {
  scale: 1.1;
  cursor: pointer;
  transition: 0.1s ease-in-out;
}

.info {
  display: flex;
  justify-content: space-between;
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
  margin-right: 5rem;
}

.name {
  font-weight: bolder;
}

.rollno {
  font-size: 10px;
}
</style>
