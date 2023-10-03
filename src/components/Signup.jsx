import React, { useEffect, useState } from "react";

import "./Components.css";
// import { FirebaseContext } from "../store/FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const direct = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      if (user.username.length < 3 || user.username[0] === " ") {
        setErr("Enter a valid username");

      } else if (user.phone.length !== 10) {
        setErr("Enter a valid mobile number");

      } else {

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        )
        updateProfile(auth.currentUser, {
          displayName: user.username,
        });
        const db = getFirestore();
        await addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          displayName: user.username,
          phone: user.phone,
        });
        direct("/login");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

      if (errorCode === "auth/weak-password") {
        setErr("Password should be at least 6 characters.");
      } else if (errorCode === "auth/email-already-in-use") {
        setErr("Email Already In Use");
      } else if (errorCode === "auth/invalid-email") {
        setErr("Enter a valid email");
      }
    }
    
  };
  useEffect(()=>{
    console.log(err)
  })
  return (
    
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src="/olx-logo.png" alt=""></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="lname"
            name="phone"
            value={user.phone}
            onChange={(e) => {
              setUser({ ...user, phone: e.target.value });
            }}
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            defaultValue="Doe"
          />
          <br />
          <br />
          {err && <p className="text-danger">{err}</p>}
          <button type="submit">Signup</button>
        </form>
        <a href='/login' className="text-decoration-none text-dark">Login</a>
      </div>
    </div>
  );
}
