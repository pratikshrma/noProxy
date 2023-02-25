<script setup>
import { ref,defineProps } from "vue";
import { collection, getDocs, where, query } from "@firebase/firestore";
import router from "../../router";

// const semester = router.currentRoute.value.params.id;
// const students = ref([]);
// const q = query(
//   collection(db, "Students"),
//   where("semester", "==", `${semester}`)
// );
// getDocs(q).then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     students.value.push({ id: doc.id, ...doc.data() });
//   });
// });
const props=defineProps({
  FingerPrint : Number
})
</script>

<template>
  <div class="outerBlock">
    Attendence Time!! {{ FingerPrint }}
  </div>
</template>

<style scoped></style>
