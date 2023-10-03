import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDA_EjmlOi21fAjf43fmh87il18E8hoOKA",
  authDomain: "olx-clone-39461.firebaseapp.com",
  projectId: "olx-clone-39461",
  storageBucket: "olx-clone-39461.appspot.com",
  messagingSenderId: "803550580897",
  appId: "1:803550580897:web:4ac94d5d87a00840f660e0",
  measurementId: "G-PW12P33Q9S",
};

export const firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase);
