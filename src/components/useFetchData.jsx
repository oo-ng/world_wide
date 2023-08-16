

import { useReducer, useEffect } from "react"
export const useFetchData = ({query}) => {
    
    const initialState = {
        status:"loading",
        cityList:[],
        
    }

    const reducer =(state, action)=>{
        switch(action.type){
            case "setCityList":
                return{...state, cityList:action.payload}
            case "finishedLoading":
                return{...state, status:"ready"}
            default:
                throw new Error("unknown action");
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const {cityList,status}=state;

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response= await fetch(`http://localhost:3002/${query}`);
                if (!response.ok){
                    throw new Error(`Couldn't fetch data for: ${query}` );
                }

                const jsonData = await response.json();
                dispatch({type:"setCityList", payload:jsonData})
            }catch(error){
                console.error(error.message)
            }finally{
                dispatch({type:"finishedLoading"})
                
            }
        }
        fetchData();
    },[ query])


    console.log("Fetched data", cityList)
    return[status,cityList]
}
