/* eslint-disable no-unused-vars */
import styles from './CountryList.module.css'
import { useFetchData } from './useFetchData'
import Spinner from './Spinner';
import CountryItem from './CountryItem'
import { useEffect, useState } from 'react';
import Message from './Message';
export const CountryList = () => {
    
    const query="cities";
    const [status, cityList] = useFetchData({query});
    const [updatedCountryList, setUpdatedCountryList] = useState();

   

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
    if(cityList){
        const uniqueCountryList = uniqueByCountry(cityList)
        setUpdatedCountryList(uniqueCountryList);
        console.log("Unique country list",uniqueCountryList);
    }
    

},[cityList])

if ( cityList?.length===0 &&status!=="loading")return(
    <Message message="Add your first city... The country will show up here." />
    )
    
    
    return(
        <>
            {status==="loading" ? <Spinner/>:(<ul className={styles.countryList}>
           { updatedCountryList?.map((country)=>
           
            <CountryItem key={country.id} country={country}/>
           
           )}
        </ul>)}
        </>
    )
}
