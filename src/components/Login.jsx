import React, { useState } from 'react';
import './Components.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [err,setErr] = useState(false)

  const direct=useNavigate()

  const HandleLogin=async (e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
      await signInWithEmailAndPassword(auth,email,password)
      direct('/')
    } catch (error) {
      const errorMessage = error.message;
			setErr(errorMessage)
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src="/olx-logo.png" alt=''></img>
        <form onSubmit={HandleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          {err && <p className="text-danger">{err}</p>}
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;