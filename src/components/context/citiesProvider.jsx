/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useContext, createContext } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import firebaseapp from "../../firebase/firebase";

const CityContext = createContext();


// eslint-disable-next-line react/prop-types
const CityProvider = ({children}) => {
    
    
    const initialState = {
        status:"loading",
        cityList:null,
        selectedCity:"",
        LoggedIn:"",
        username:""
        
    }

    

    const reducer =(state, action)=>{
        switch(action.type){
            case "setSelectedCity":
                return{...state, selectedCity:action.payload}
            case "setCityList":
                return{...state, cityList:action.payload}
            case "finishedLoading":
                return{...state, status:"ready"}
            case "startLoading":
                return{...state, status:"loading"}
            case "updateCityList":
                return{...state, cityList:action.payload}
            case "ChangeLoggedInState":
                return{...state, LoggedIn:action.payload}
            case "updateUser":
                return{...state, username:action.payload}
            default:
                throw new Error(`Unknown action type: ${action.type}`);
                
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const {cityList,status, username, LoggedIn, selectedCity} = state;

    const fetchCityListData = async()=>{
        try{
            dispatch({type:"startLoading"})
            const response= await fetch(`http://localhost:3002/cities`);
            if (!response.ok){
                throw new Error(`Couldn't fetch data for: cities` );
            }

            const jsonData = await response.json();
            dispatch({type:"setCityList", payload:jsonData})
        } catch(error){
        console.error(error.message)
        }finally{
            dispatch({type:"finishedLoading"})
            
        }
    }
    useEffect(()=>{
        
        fetchCityListData();

    },[])

    useEffect(()=>{
        let x='';
        const auth = getAuth(firebaseapp)
        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                x=true;
            } else {
                x=false;
            }
            console.log("check,",x)
            
            dispatch({type:"ChangeLoggedInState", payload:x})
            if(x===true){
                const displayame=(auth.currentUser.displayName);
                dispatch({type:"updateUser", payload:displayame})
            }
        });
    },[onAuthStateChanged])

    
    const deleteCity = async(cityToBeDeletedID)=>{
        try{
            const response= await fetch(`http://localhost:3002/cities/${cityToBeDeletedID}`,{
                method:'DELETE',
            }
            );
            console.log("response", response)
            if (!response.ok){
                throw new Error(`Couldn't delete data for ID: ${cityToBeDeletedID}` );
            }
            

        } catch(error){ 
        console.error(error.message)
        }
    }

    const Signout = () =>{
        const auth = getAuth(firebaseapp)
        signOut(auth)
        .then(() => {
        console.log("User signed out successfully");
        }).catch((error) => {
        console.error("Error signing out:", error.message);
        });
    } 
    

    const createCity = async(newCity)=>{
        try{
            dispatch({type:"startLoading"})
            const response= await fetch(`http://localhost:3002/cities`,{
                method:'POST',
                body: JSON.stringify(newCity),
                headers:    {
                    "Content-Type": "application/json",
                },
            }
            );
            if (!response.ok){
                throw new Error(`Couldn't upload data for: cities` );
            }
            const jsonData = await response.json();
            console.log("From createCity;",jsonData);

        } catch(error){
        console.error(error.message)
        }finally{
            fetchCityListData();
            dispatch({type:"finishedLoading"})
        }
    }


    return(
        <CityContext.Provider 
        value={{cityList, status, Signout, username,LoggedIn, dispatch, deleteCity, selectedCity, createCity}}>
            {children}
        </CityContext.Provider>
    )
}



const useCities = () =>{
    const context = useContext(CityContext);
    if (context === undefined ){
        throw new Error("CityContext was used outside of the CityProvider")
        }
       
    return context;
}

export {CityProvider, useCities };