import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const settings = {
    timestampsInSnapshots: true, 
    merge: true 
};


// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBkySnoU5cjiuXgz6tstj1CPP_Sis4fncE",
  authDomain: "quizpractice-edca3.firebaseapp.com",
  projectId: "quizpractice-edca3",
  storageBucket: "quizpractice-edca3.appspot.com",
  messagingSenderId: "576945248274",
  appId: "1:576945248274:web:5a821411c47290e834e0cb"
};

// Initialize Firebase
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;