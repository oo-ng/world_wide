/* eslint-disable no-unused-vars */
import styles from "./Login.module.css";
import { useState, useRef } from "react";
import firebaseapp from "../firebase/firebase";
import{getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate,NavLink } from "react-router-dom";
import { PageNav } from "../components/PageNav";



 export function Signup() {
  const timerRef= useRef(null);
  const auth= getAuth(firebaseapp);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmission= (e)=>{
    
    e.preventDefault();
    
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        console.log(userCredential);
        const user = userCredential.user;
        if(user){
            updateProfile(user,{
                displayName: username
            })
        }
        setMessage("Successfully signed in");
        setTimeout(()=>{
            navigate('/');
        },1000)
      })
      
    .catch((error)=>{

      setMessage(error.message)
      console.error("Error registering user:", error.message)
      
    })
  }

  return (
    <main className={styles.login}>
      <PageNav/>
      
      <form className={styles.form}>

      <div className={styles.row}>
          <label htmlFor="displayName">Username</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

    
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
          onClick={handleSubmission}>Login
          </button>
          <div>{message}</div>
        </div>
        
        <div>
            Have an account? <NavLink to="/login">
              Login here.
            </NavLink>
        </div>
      </form>
    </main>
  );
}
