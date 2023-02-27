
import { defineStore } from 'pinia'
import { db } from '../components/firebase'
import { collection, getDocs, where, query } from '@firebase/firestore';
import { ref } from 'vue';
import router from '../router'

export const useSubjectStore = defineStore('subject',async () => {
  const semester=router.currentRoute.value.params.id
  const subjects = ref([]);
  const q = query(collection(db, "teachers"), where("semester", "==",`${semester}`))
  const querySnapshot = await getDocs(q)
   querySnapshot.forEach((doc) => {
    subjects.value.push({id:doc.id,...doc.data()})
   })
   return { subjects }
  })
  

