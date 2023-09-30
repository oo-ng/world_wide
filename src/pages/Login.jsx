/* eslint-disable no-unused-vars */
import styles from "./Login.module.css";
import { useState } from "react";
import firebaseapp from "../firebase/firebase";
import{getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate,NavLink } from "react-router-dom";
import { PageNav } from "../components/PageNav";



 export function Login() {
  const auth= getAuth(firebaseapp);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmission= async (e)=>{
    e.preventDefault();
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      console.log(userCredential);
      setMessage("Login successful.");
      setTimeout(()=>{
        navigate('/');
    },1000);
  
    }
    catch(error){
      setMessage(error.message);
      throw new Error("Login error");
      
    }
  }

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form}>
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
          onClick={handleSubmission}>Login</button>
          <span>{message}</span>
        </div>
        
        <div>
            Dont have an account? <NavLink to="/signup">
              Sign up here.
            </NavLink>
        </div>
      </form>
    </main>
  );
}
