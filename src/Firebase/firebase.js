// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB9B_wYu3zEGu-7KCSCnv9fyVrtesyUENE',
  authDomain: 'fir-blog-fb733.firebaseapp.com',
  databaseURL: 'https://fir-blog-fb733-default-rtdb.firebaseio.com',
  projectId: 'fir-blog-fb733',
  storageBucket: 'fir-blog-fb733.appspot.com',
  messagingSenderId: '365352286523',
  appId: '1:365352286523:web:b671978b817a399d249f1e',
  measurementId: 'G-6V8044CS6M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, storage, firestore };
