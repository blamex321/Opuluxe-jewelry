import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDGXIh0qCuDyn_CGUWMCKX-AvuPJwc9evU",
  authDomain: "sgk-jewellers.firebaseapp.com",
  databaseURL:
    "https://sgk-jewellers-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sgk-jewellers",
  storageBucket: "sgk-jewellers.appspot.com",
  messagingSenderId: "681223003155",
  appId: "1:681223003155:web:5b3246793fd377d744b3e6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
