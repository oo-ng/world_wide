import { useNavigate } from "react-router-dom";
import { useCities } from "./context/citiesProvider";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({children}) => {

const {LoggedIn} = useCities();
const navigate = useNavigate();

useEffect(()=>{
    if(!LoggedIn){
        navigate('/login')
    }
},[LoggedIn, navigate])
    return(
       <>{LoggedIn?children:null}</>
    )
}
