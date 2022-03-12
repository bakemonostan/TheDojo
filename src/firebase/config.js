import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD9bHXR-3-ze8NEJpCINbPgPqiWNZID8WM',
  authDomain: 'the-dojo-70150.firebaseapp.com',
  projectId: 'the-dojo-70150',
  storageBucket: 'the-dojo-70150.appspot.com',
  messagingSenderId: '600271201459',
  appId: '1:600271201459:web:8362f7a2520c167b9a7cc6',
};

// * Initialize Firebase
firebase.initializeApp(firebaseConfig);

// * initialize Services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// * TimeStamp
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timestamp };
