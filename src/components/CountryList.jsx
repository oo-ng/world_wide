/* eslint-disable no-unused-vars */
import styles from './CountryList.module.css'
import { useFetchData } from './useFetchData'
import Spinner from './Spinner';
import CountryItem from './CountryItem'
import { useEffect, useState } from 'react';
export const CountryList = () => {
    
    const query="cities";
    const [status, cityList] = useFetchData({query});
    const [updatedCountryList, setUpdatedCountryList] = useState();

    // useEffect(()=>{
    //     if(status==="ready"){
    //         setUpdatedCountryList(cityList)
    //     }
    // },[cityList, status])

useEffect(()=>{
    const uniqueByCountry = (cityList) =>{
        const seenCountry = new Set();
        return cityList.filter((city)=>{
            if(!seenCountry.has(city.country)){
                seenCountry.add(city.country)
                return true;
            }
            return false;
        })
    }

    const uniqueCountryList = uniqueByCountry(cityList)
    setUpdatedCountryList(uniqueCountryList);
    console.log("Unique country list",uniqueCountryList);

},[cityList])
    
    
    return(
        <>
            {status==="loading" ? <Spinner/>:(<ul className={styles.countryList}>
           { updatedCountryList.map((country)=>
           
            <CountryItem key={country.id} country={country}/>
           
           )}
        </ul>)}
        </>
    )
}
