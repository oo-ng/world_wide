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

    const handleDeleteCityClick= (ID) => {
        setCityToBeDeletedID(ID);
        const filteredList = filteredCityList.filter((city)=>
                city.id !== ID
        )  
        setFilteredCityList(filteredList);

        dispatch({type:"updateCityList", payload:filteredList})
        console.log("Updated cityList", cityList)

    }
    
    // useEffect(() => {
    //     const filteredList = cityList.filter(city => city.id !== cityToBeDeletedID);
    //     setFilteredCityList(filteredList);
    // }, [cityList, cityToBeDeletedID]);
    

    if ( cityList?.length===0 &&status!=="loading")return(
    <Message message="Add your first city by clicking on a city on the map" />
    )

    
    return(
        <>
            {status==="loading" ? <Spinner/>:(
            <ul className={styles.cityList}>
            {filteredCityList.map((city)=>

            <CityItem 
            setCityToBeDeletedID={setCityToBeDeletedID} 
            handleDeleteCityClick={handleDeleteCityClick}
            key={city.id}
            city={city}/>
            
           )}
        </ul>)}
        {console.log("cityToBeDeletedID",cityToBeDeletedID)}
        </>
    )
}
