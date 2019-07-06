import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBY1-y4VcgDnfKa7T2RfckD6OKOgYYn19Q",
    authDomain: "holy-vegan.firebaseapp.com",
    databaseURL: "https://holy-vegan.firebaseio.com",
    projectId: "holy-vegan",
    storageBucket: "holy-vegan.appspot.com",
    messagingSenderId: "564124125303",
    appId: "1:564124125303:web:e26ebfd0da531408"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.storage();

export default firebase;