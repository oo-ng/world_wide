/* eslint-disable no-unused-vars */
import styles from './CountryList.module.css'
import { useFetchData } from './useFetchData'
export const CountryList = () => {

    const query="cities";
    const [status, cityList] = useFetchData({query});
    
    const uniqueCountryList = cityList.filter((country)=>
    )
    return(
        <div>
            
        </div>
    )
}
