import { useReducer, useEffect } from "react"
export const useFetchData = ({query}) => {
    
    const initialState = {
        status:"loading",
        cityList:null,
        
    }

    const reducer =(state, action)=>{
        switch(action.type){
            case "setCityList":
                
                return{...state, cityList:action.payload}
            case "finishedLoading":
                return{...state, status:"ready"}
            case "updateCityList":
                localStorage.setItem('cityData', JSON.stringify(action.payload) );
                return{...state, cityList:action.payload}
            default:
                throw new Error("unknown action");
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const {cityList,status}=state;

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const storedData = localStorage.getItem('cityData')
                console.log("stored data",storedData);
                
                if(storedData){
                    console.log(storedData);
                    
                    console.log("using stored data", storedData)
                    dispatch({ type: "setCityList", payload: JSON.parse(storedData) });
                    dispatch({ type: "finishedLoading" });
                    
                }else{
                    console.log("not using stored data")
                    const response= await fetch(`http://localhost:3002/${query}`);
                    if (!response.ok){
                        throw new Error(`Couldn't fetch data for: ${query}` );
                    
                    }

                    const jsonData = await response.json();
                    
                    localStorage.setItem('cityData', JSON.stringify(jsonData));
                    dispatch({type:"setCityList", payload:jsonData})
                    
                }
            }catch(error){
                console.error(error.message)
            }finally{
                dispatch({type:"finishedLoading"})
                
            }
        }
        fetchData();
    },[ query])



    return[status , cityList, dispatch]
}
