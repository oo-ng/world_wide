import { useEffect, useReducer, useContext, createContext } from "react";



const CityContext = createContext();


// eslint-disable-next-line react/prop-types
const CityProvider = ({children}) => {
    
    
    const initialState = {
        status:"loading",
        cityList:null,
        selectedCity:""
        
        
    }

    const reducer =(state, action)=>{
        switch(action.type){
            case "setSelectedCity":
                return{...state, selectedCity:action.payload}
            case "setCityList":
                return{...state, cityList:action.payload}
            case "finishedLoading":
                return{...state, status:"ready"}
            case "updateCityList":
                
                return{...state, cityList:action.payload}
                default:
                    throw new Error(`Unknown action type: ${action.type}`);
                
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    const {cityList,status, selectedCity} = state;

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                
                    const response= await fetch(`http://localhost:3002/cities`);
                    if (!response.ok){
                        throw new Error(`Couldn't fetch data for: cities` );
                    
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

    },[])


    return(
        <CityContext.Provider 
        value={{cityList, status, dispatch, selectedCity}}>
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