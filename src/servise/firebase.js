import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB2MvwpwYHny8reCTVxRh-02th52OhNPOw",
  authDomain: "react-todo-pwa-1165f.firebaseapp.com",
  projectId: "react-todo-pwa-1165f",
  storageBucket: "react-todo-pwa-1165f.appspot.com",
  messagingSenderId: "858773499798",
  appId: "1:858773499798:web:d69fa4cdaf59c8f199b7b7",
});

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
db.enablePersistence();

export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
      document.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
};
