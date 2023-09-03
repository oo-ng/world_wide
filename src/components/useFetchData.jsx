import { useReducer, useEffect } from "react"
export const useFetchData = ({query}) => {
    
    const initialState = {
        statusofData:"loading",
        data:null,
        
    }

    const reducer =(state, action)=>{
        switch(action.type){
            case "setData":
                return{...state, data:action.payload}
            case "finishedLoadingData":
                return{...state, statusofData:"ready"}
            default:
                throw new Error("unknown action");
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const {data,statusofData}=state;

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                    const response= await fetch(`http://localhost:3002/${query}`);
                    if (!response.ok){
                        throw new Error(`Couldn't fetch data for: ${query}` );
                    
                    }

                    const jsonData = await response.json();
                    
                    
                    dispatch({type:"setData", payload:jsonData})
                    
                
            }catch(error){
                console.error(error.message)
            }finally{
                dispatch({type:"finishedLoadingData"})
                
            }
        }
        fetchData();
    },[query])



    return[statusofData ,data, dispatch]
}
