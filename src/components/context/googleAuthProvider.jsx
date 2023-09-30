/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useContext, createContext } from "react";
import firebaseapp from "../../firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider as FirebaseGoogleAuthProvider } from 'firebase/auth';
//import { useNavigate } from "react-router-dom";

const GoogleAuthContext = createContext();


export const GoogleAuthContextProvider = ({children}) => {
    
    
    const provider = new FirebaseGoogleAuthProvider();
   

    const initialState ={
        statusOfauth: "idle",
        isLoggedIn: false,
    }
    
   
    
    const reducer =(state, action)=>{
        switch (action.type){
            case "finishedLoading":
                return {...state, statusOfauth:"ready", isLoggedIn:true}
            case "errorCouldntLogIn":
                return {...state, statusOfauth: "failed", isLoggedIn:false}
            default:
                throw new Error(`Unknown action type: ${action.type}`);
            

        }
    }


    
    const [state, dispatch] = useReducer(reducer, initialState);
    const  {statusOfauth, isLoggedIn}=state;





  //const navigate = useNavigate();

  const handleGoogleLogin = () => {
    
    const auth = getAuth(firebaseapp);
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        const credential = FirebaseGoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        dispatch({type:"finishedLoading"})
        //navigate('/');
      })
      .catch(error => {
        console.error("Error during Google sign-in:", error);
        dispatch({type:"errorCouldntLogIn"});
      });
  }



    return(
        <GoogleAuthContext.Provider 
        value={{...state, handleGoogleLogin}}>
            {children}
        </GoogleAuthContext.Provider>
    )
}


const useGoogleAuth = () =>{
    const context = useContext(GoogleAuthContext);
    if (context === undefined ){
        throw new Error("googleAuth was used outside of the googleAuthContextProvider")
    }
       
    return context;
}

export {useGoogleAuth}

