<script setup>
import { db } from "@/firebase";
import { collection, getDocs, where, query } from "@firebase/firestore";
import { ref, watchEffect, watch, onMounted } from "vue";
import router from "../router";
import StudentAtt from '../components/Attendancepagecomponents/StudentAtt.vue'
import Navbar from '../components/Navbar.vue'

const semester = ref(router.currentRoute.value.params.id)
const sessions = ref([]);
const currentSession = ref("");
const year = ref();
const subjects = ref([]);
const students = ref([]);
let designSub = ref()
let designMon = ref()
const months = ref([])
let selectedMonth = ref();
let selectedSubject = ref();
let selectedMonthBeginingDate = ref();
let finger = ref([])
let loading = ref(true)

watch(() => router.currentRoute.value.params, () => {
  semester.value = router.currentRoute.value.params.id
  console.log(semester.value)
  designSub.value = null
  designMon.value = null
})

watch([semester], async () => {
  subjects.value = []
  months.value = []
  fetchData()
})
watchEffect(async () => {
  fetchData()
})

watch(designSub, () => {
  if (designSub.value != null) {
    designSub.value[0].classList.add('selectedSubject')
    designSub.value[0].classList.remove('unSelectedSubject')
  }
})
watch(designMon, () => {
  if (designMon.value != null) {
    designMon.value[0].classList.add('selectedMonth')
  }
})
// fetch Students
watch(year, async () => {
  students.value = []
  loading.value = true
  const StudenttQuery = query(collection(db, `students-${year.value}`))
  const querySnapshotStudents = await getDocs(StudenttQuery)
  querySnapshotStudents.forEach((doc) => {
    students.value.push({ id: doc.id, ...doc.data() })
  })
  loading.value = false
})

async function fetchData() {
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
    if (semester.value == "1" || semester.value == "2") {
      year.value = sessionYearI;
    } else if (semester.value == "3" || semester.value == "4") {
      year.value = sessionYearI - 1;
    } else {
      year.value = sessionYearI - 2;
    }
  });

  if (semester.value == 1 || semester.value == 3 || semester.value == 5) {
    const monthQuery = query(
      collection(db, `months-${currentSession.value.current}`),
      where("sessionType", "==", "S")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }
  else if (semester.value == 2 || semester.value == 4 || semester.value == 6) {
    const monthQuery = query(
      collection(db, `months-${currentSession.value.current}`),
      where("sessionType", "==", "E")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }
  if (months.value.length < 1) {
    return
  }

  // fetch Subjects
  const SubjectQuery = query(
    collection(db, "Subject"),  //#FIXLater -> Change the Subject to subject in production 
    where("semester", "==", `${semester.value}`)
  );
  const querySnapshotSubject = await getDocs(SubjectQuery);
  querySnapshotSubject.forEach((doc) => {

    subjects.value.push({ id: doc.id, ...doc.data() });
  });
  selectedSubject.value = subjects.value[0].subject
  selectedMonth.value = months.value[0].month
  selectedMonthBeginingDate.value = months.value[0].createdAt
  loading.value = false

}

//select month
const showMonths = (month, index) => {
  selectedMonth.value = month.month
  selectedMonthBeginingDate.value = month.createdAt
  let currentMon = designMon.value[index]
  for (let i = 0; i <= months.value.length - 1; i++) {
    if (designMon.value[i] == currentMon) {
      designMon.value[i].classList.add('selectedMonth')
    }
    else {
      designMon.value[i].classList.remove('selectedMonth')
    }
  }
}

// Select Subject
const showSubject = (sub, index) => {
  selectedSubject.value = sub
  let currentSub = designSub.value[index]
  for (let i = 0; i <= subjects.value.length - 1; i++) {
    if (designSub.value[i] == currentSub) {
      designSub.value[i].classList.add('selectedSubject')
      designSub.value[i].classList.remove('unSelectedSubject')
    }
    else {
      designSub.value[i].classList.remove('selectedSubject')
      designSub.value[i].classList.add('unSelectedSubject')
    }
  }
}
watch(selectedMonth, () => {
  finger.value = [""]
})
// show attendance component 
watch(selectedSubject, () => {
  finger.value = [""]
})
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
      <p class="pleaseSelect">Please select a subject below:</p>

      <!-- subjects -->
      <div class="CollegeSubjects">
        <div ref="designSub" @click="showSubject(subject.subject, index)" class="subjects"
          v-for="(subject, index) in subjects" :key="index">
          {{ subject.subject }}
        </div>
      </div>
    </div>

    <!-- SECOND HALF-->
    <div v-if="(months.length < 1 || students.length == 0) && !loading">Sorry No Attendence For This Semester</div>
    <div v-else-if="months.length < 1 && loading"></div>
    <div v-else>
      <div class="Attendancebottom">
        <!-- months -->
        <div class="monthsSubjects">
          <div ref="designMon" class="months" @click="showMonths(month, index)" v-for="(month, index) in months"
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
                <span class="rollno">Roll No. - {{ student.rollNo }}</span>
              </div>
            </div>
            <StudentAtt v-if="finger[index] && selectedSubject && selectedMonth" :FingerPrint="finger[index]"
              :subjects="selectedSubject" :months="selectedMonth" :time="selectedMonthBeginingDate" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-face);
}

.pleaseSelect {
  font-size: 30px;
  font-family: var(--font-face);
  color: lavender;
}

.attendanceTop {
  background-image: url(/AttendanceImage.svg);
  height: 36.063rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Attendancebottom {
  margin-top: -4rem;
  background-color: lavender;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
}

.pageName {
  color: lavender;
  font-size: 7rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 2rem;
}

.CollegeSubjects {
  display: flex;
  height: auto;
  gap: 4rem;
  justify-content: space-evenly;
  padding-top: 1rem;
  margin-top: 2rem;

}

.monthsSubjects {
  display: flex;
  height: auto;
  gap: 4rem;
  justify-content: space-evenly;
  padding-top: 1rem;

}

.subjects {
  height: 5rem;
  font-size: 25px;
  padding: .5rem .5rem;
  border-radius: 50px;
  color: white;
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

.months {
  height: 5rem;
  font-size: 25px;
  padding: .5rem .5rem;
  border-radius: 50px;
  color: #356D69;
  border: 1px solid #356D69;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  text-transform: capitalize;
}

.months:hover {
  scale: 1.1;
  cursor: pointer;
  transition: 0.2s ease-in-out;
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

.selectedSubject {
  color: black;
  background-color: lavender;
}

.unSelectedSubject {
  color: lavender;
  background-color: transparent;
}

.selectedMonth {
  background-color: #356D69;
  border: 1px solid #356D69;
  color: lavender;
}

.unSelectedMonth {
  background-color: #356D69;
  border: 1px solid lavender;
  color: lavender
}
</style>
