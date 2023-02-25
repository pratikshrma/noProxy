import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyBdCsjaaZBdddGnP9gcNjbzwnggNqohJiA",
  
    authDomain: "nodemcu-dev.firebaseapp.com",
  
    projectId: "nodemcu-dev",
  
    storageBucket: "nodemcu-dev.appspot.com",
  
    messagingSenderId: "708765011149",
  
    appId: "1:708765011149:web:d2ce853a48b74f99f3ad84",
  
    measurementId: "G-JSKQE45RSZ"
  
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);