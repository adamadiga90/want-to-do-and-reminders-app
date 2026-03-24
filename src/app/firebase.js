// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // ✅ ADD THIS LINE!

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4P-q0VbDJU4f0VEJE8r1i0I5XwODbnuk',
  authDomain: 'my-todo-with-reminders-app.firebaseapp.com',
  projectId: 'my-todo-with-reminders-app',
  storageBucket: 'my-todo-with-reminders-app.firebasestorage.app',
  messagingSenderId: '524690454282',
  appId: '1:524690454282:web:5f37ed11ae4620f390ecf3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
