<script setup>
import { db } from "@/firebase";
import { collection, getDocs, where, query } from "@firebase/firestore";
import { ref, watchEffect, watch, onMounted } from "vue";
import router from "../router";
import StudentAtt from '../components/Attendancepagecomponents/StudentAtt.vue'
import Navbar from '../components/Navbar.vue'

const semester = router.currentRoute.value.params.id;
const sessions = ref([]); //Stores the Sessions
const currentSession = ref(""); //Store the current Session
const currentYear = ref();//Stores the current year
const year = ref(); //Calculate the Year based on Semester selected in Home Page
const subjects = ref([]);
const students = ref([]);
const designSub = ref()
const designMon = ref()
const months = ref([])
let selectedMonth = ref();
let selectedSubject = ref();
let selectedMonthBeginingDate = ref();
let finger = ref([])

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
  // console.log(currentSession.value)
  //fetch months


  if (semester == 1 || semester == 3 || semester == 5) {
    const monthQuery = query(
      collection(db, `months-${currentSession.value.current}`),
      where("sessionType", "==", "S")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }
  else if (semester == 2 || semester == 4 || semester == 6) {
    const monthQuery = query(
      collection(db, `months-${currentSession.value.current}`),
      where("sessionType", "==", "E")
    );
    const querySnapshotMonth = await getDocs(monthQuery);
    querySnapshotMonth.forEach((doc) => {
      months.value.push({ id: doc.id, ...doc.data() });
    });
  }
  // fetch Subjects

  //isko change karna pdaga
  //subjects fetch karne mei kafi issue hei abhi
  const SubjectQuery = query(
    collection(db, "teachers"),
    where("semester", "==", `${semester}`)
  );
  const querySnapshotSubject = await getDocs(SubjectQuery);
  querySnapshotSubject.forEach((doc) => {

    subjects.value.push({ id: doc.id, ...doc.data() });
  });



  selectedSubject.value = subjects.value[0].subject
  selectedMonth.value = months.value[0].month
  selectedMonthBeginingDate.value = months.value[0].createdAt

})

watch(designSub, () => {
  designSub.value[0].style.backgroundColor = "lavender"
  designSub.value[0].style.color = "black"
})
watch(designMon, () => {
  designMon.value[0].style.backgroundColor = "#356D69"
  designMon.value[0].style.color = "lavender"
  designMon.value[0].style.border = "1px solid lavender"
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
const showMonths = (month, index) => {
  selectedMonth.value = month.month
  selectedMonthBeginingDate.value = month.createdAt
  let currentMon = designMon.value[index]
  for (let i = 0; i <= months.value.length - 1; i++) {
    if (designMon.value[i] == currentMon) {
      currentMon.style.backgroundColor = "lavender"
      currentMon.style.border = "1px solid #356D69"
      currentMon.style.color = "#356D69"
      designMon.value[i].style.backgroundColor = "#356D69"
      designMon.value[i].style.color = "lavender"
      designMon.value[i].style.border = "1px solid lavender"
    }
    else {
      currentMon.style.backgroundColor = "#356D69"
      currentMon.style.border = "1px solid lavender"
      currentMon.style.color = "lavender"
      designMon.value[i].style.backgroundColor = "lavender"
      designMon.value[i].style.color = "#356D69"
      designMon.value[i].style.border = "1px solid #356D69"
    }
  }
}



// Select Subject


const showSubject = (sub, index) => {
  selectedSubject.value = sub
  let currentSub = designSub.value[index]
  for (let i = 0; i <= subjects.value.length - 1; i++) {
    if (designSub.value[i] == currentSub) {
      currentSub.style.color = "lavender"
      designSub.value[i].style.backgroundColor = "lavender"
      designSub.value[i].style.color = "black"
    }
    else {
      currentSub.style.color = "black"
      designSub.value[i].style.backgroundColor = "transparent"
      designSub.value[i].style.color = "lavender"
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
              <span class="rollno">Roll No. -{{ student.rollNo }}</span>
            </div>
          </div>
          <StudentAtt v-if="finger[index] && selectedSubject && selectedMonth" :FingerPrint="finger[index]"
            :subjects="selectedSubject" :months="selectedMonth" :time="selectedMonthBeginingDate" />
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
  margin-top: -5rem;
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
</style>
