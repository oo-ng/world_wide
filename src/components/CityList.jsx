/* eslint-disable no-unused-vars */
import styles from './CityList.module.css'
import Spinner from './Spinner'
import { useEffect, useReducer } from 'react'
import { CityItem } from './CityItem'
import Message from './Message'
import { useFetchData } from './useFetchData'

export const CityList = () => {
    const query = "cities";

    const [status, cityList] = useFetchData({query});

    if (cityList.length===0&&status!=="loading")return(
    <Message message="Add your first city by clicking on a city on the map" />
    )

    
    return(
        <>
            {status==="loading" ? <Spinner/>:(<ul className={styles.cityList}>
           { cityList.map((city)=>
           
            <CityItem key={city.id} city={city}/>
           
           )}
        </ul>)}
        </>
    )
}
