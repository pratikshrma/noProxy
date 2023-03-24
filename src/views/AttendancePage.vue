<script setup>
import { db } from "@/firebase";
import { collection, getDocs, where, query, orderBy } from "@firebase/firestore";
import { ref, watchEffect, watch, computed } from "vue";
import router from "../router";
import StudentAtt from '../components/Attendancepagecomponents/StudentAtt.vue'
import Navbar from '../components/Navbar.vue'
import loadingComponent from "../components/loadingComponent.vue"

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
let currentSessionType = ref('')
let prevSessionType = ref(null)

if (semester.value == 1 || semester.value == 3 || semester.value == 5) {
  currentSessionType.value = 'S';
} else {
  currentSessionType.value = 'E';
}


watch(() => router.currentRoute.value.params, () => {
  semester.value = router.currentRoute.value.params.id
  designSub.value = null
  designMon.value = null
})

watch([semester], async () => {
  if (semester.value == 1 || semester.value == 3 || semester.value == 5) {
    currentSessionType.value = 'S';
  } else {
    currentSessionType.value = 'E';
  }
  // subjects.value = []
  // months.value = []
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
  if (currentSessionType.value != prevSessionType.value) {
    months.value = []
    const monthQuery = query(
      collection(db, `months-${currentSession.value.current}`),
      where("sessionType", "==", currentSessionType.value), orderBy('createdAt')
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
    prevSessionType.value = currentSessionType.value
  }
  const SubjectQuery = query(
    collection(db, "Subject"),  //#FIXLater -> Change the Subject to subject in production 
    where("semester", "==", `${semester.value}`)
  );
  let tempSubjects = []
  subjects.value = []
  const querySnapshotSubject = await getDocs(SubjectQuery);
  querySnapshotSubject.forEach((doc) => {
    const subject = { id: doc.id, ...doc.data() }
    tempSubjects.push(subject);
  });
  if (tempSubjects.length != 0) {
    //sometimes if you change semester too quickly even before the pevious semester subjects were 
    //even loaded then there is a chance that the pevious sem subjects would merge with the 
    //current sem subjects 
    //and that is why this filter is being used.
    tempSubjects.filter(sub => sub.semester === semester.value)
    subjects.value = tempSubjects
    selectedSubject.value = subjects.value[0].subject
  }
  if (months.value.length != 0) {
    selectedMonth.value = months.value[0].month
    selectedMonthBeginingDate.value = months.value[0].createdAt
  }

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

const isActive = ref(false)
const designStudent = ref()
const ShowAtt = (Attendance, index) => {
  if (!finger.value[index]) {
    finger.value[index] = Attendance
    for (let i = 0; i <= students.value.length - 1; i++) {
      if (designStudent.value[i] === designStudent.value[index]) {
        designStudent.value[i].style.height = "auto"
      }
    }
  }
  else {
    finger.value[index] = null
    for (let i = 0; i <= students.value.length - 1; i++) {
      if (designStudent.value[i] === designStudent.value[index]) {
        designStudent.value[i].style.height = "5rem"
      }
    }
  }

}
</script>

<template>
  <!-- FIRST HALF -->
  <div id="AttendancePage">
    <div class="attendanceTop">
      <Navbar />
      <p class="pageName">attendance</p>
      <p class="pleaseSelect">Please select a subject:</p>

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
      <div class="sorry" v-if="(months.length < 1 || students.length == 0) && !loading">
        <img src="/sorry.png" />
        <span>No Attendence For This Semester !!</span>
      </div>
      <div class="sorry" v-else-if="months.length < 1 && loading">
        <loadingComponent />
      </div>
      <div v-else>
        <!-- months -->
        <div class="monthsSubjects">
          <div ref="designMon" class="months" @click="showMonths(month, index)" v-for="(month, index) in months"
            :key="index">
            {{ month.month }}
          </div>
        </div>


        <!-- Students List -->

        <div class="StudentCard">
          <div ref="designStudent" class="student" :class="{ expandedStudent: isActive }"
            @click="ShowAtt(student.fid, index)" v-for="(student, index) in students" :key="index">
            <div class="info">
              <img :src="student.image" class="image" />
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
  background-image: url(/AttendanceImage.jpg);
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

.sorry {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem
}

.sorry img {
  height: 12rem;
  width: 15rem;
  margin-left: -2rem;
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
  width: 90%;
  justify-content: space-evenly;
  padding: 1rem 3rem;
  margin-top: 2rem;
}

.subjects {
  height: 5rem;
  font-size: 23px;
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

.monthsSubjects {
  display: flex;
  height: auto;
  gap: 4rem;
  justify-content: space-evenly;
  padding-top: 1rem;

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
  width: 15rem;
  text-transform: capitalize;
}

.months:hover {
  scale: 1.1;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}


.StudentCard {
  display: flex;
  padding: 3rem 3rem;
  justify-content: center;
  gap: 5rem;
  flex-wrap: wrap;
  height: auto;
}

.student {
  background-color: #356D69;
  box-shadow: 1px 1px 4px #356D69;
  border: 1px solid white;
  height: 5.5rem;
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
  border-radius: 99px;
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

@media screen and (max-width:890px) {
  .Attendancebottom {
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    margin-top: -12rem;
    height: auto;
    min-height: 20rem;

  }

  .pageName {
    font-size: 4rem;
  }

  .pleaseSelect {
    font-size: 1.5rem;
  }

  .CollegeSubjects {
    gap: 1rem;
    width: 100%;
    padding: 1rem 0;
    overflow-x: scroll;
    justify-content: flex-start;
  }

  .subjects {
    margin-left: 1rem;
    font-size: 12px;
    padding: .2rem .9rem;
    width: 5.5rem;
    height: 2.3rem;
    border-radius: 100px;

  }

  .monthsSubjects {
    gap: 1rem;
    width: 95%;
    padding: 1rem .5rem;
  }

  .months {
    font-size: 14px;
    padding: .5rem .5rem;
    width: 10rem;
    height: auto;
    border-radius: 100px;
  }

  .StudentCard {
    flex-wrap: wrap;
    width: 95%;
    height: auto;
    padding: 0 .5rem;
    flex-direction: row;
    gap: 1.8rem;
    justify-content: center;
  }

  .student {
    width: 15rem;
    border-radius: 30px;
    height: auto;
  }

  .student:hover {
    scale: unset;

  }

  .details {
    margin-left: .5rem;
  }

  .image {
    height: 3rem;
    width: 3rem;
  }

  .name {
    font-size: 15px;
  }

  .rollno {
    font-size: 10px;
  }

  .sorry {
    font-size: 1.5rem;
  }
}
</style>
