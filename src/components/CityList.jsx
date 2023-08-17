/* eslint-disable no-unused-vars */
import styles from './CityList.module.css'
import Spinner from './Spinner'
import { useState, useEffect } from 'react'
import { CityItem } from './CityItem'
import Message from './Message'
import { useFetchData } from './useFetchData'

export const CityList = () => {
    const [cityToBeDeletedID,setCityToBeDeletedID]=useState()
    const query = "cities";
    const [status, cityList, dispatch] = useFetchData({query});
    const [filteredCityList, setFilteredCityList]=useState([]);

    useEffect(()=>{
        if(status==="ready"){
            setFilteredCityList(cityList);
        }
        
    },[ status, cityList])

    useEffect(() => {
         const filteredList = filteredCityList.filter((city)=>
                    city.id !== cityToBeDeletedID
            )  
            setFilteredCityList(filteredList);

            dispatch({type:"updateCityList", payload:filteredList})
            console.log("Updated cityList", cityList)

    },[cityToBeDeletedID])
    
    // useEffect(() => {
    //     const filteredList = cityList.filter(city => city.id !== cityToBeDeletedID);
    //     setFilteredCityList(filteredList);
    // }, [cityList, cityToBeDeletedID]);
    

    if (cityList.length===0&&status!=="loading")return(
    <Message message="Add your first city by clicking on a city on the map" />
    )

    
   

    

    
    return(
        <>
            {status==="loading" ? <Spinner/>:(
            <ul className={styles.cityList}>
            {filteredCityList.map((city)=>

            <CityItem 
            setCityToBeDeletedID={setCityToBeDeletedID} key={city.id}
            city={city}/>
            
           )}
        </ul>)}
        {console.log("cityToBeDeletedID",cityToBeDeletedID)}
        </>
    )
}
