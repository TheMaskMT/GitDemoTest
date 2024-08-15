import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1J1Y79U6ubm2Kc1j31Rc5oZXks9ahF_Q",
    authDomain: "trainwarningapp-f4ac2.firebaseapp.com",
    databaseURL: "https://trainwarningapp-f4ac2-default-rtdb.firebaseio.com",
    projectId: "trainwarningapp-f4ac2",
    storageBucket: "trainwarningapp-f4ac2.appspot.com",
    messagingSenderId: "926788876978",
    appId: "1:926788876978:web:ff45d5418b7ac25788e7ab",
    measurementId: "G-2R6F9FNVBK"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase, db };

  const db = getDatabase();

