/* eslint-disable no-unused-vars */
import styles from './CountryList.module.css'
import { useFetchData } from './useFetchData'
import Spinner from './Spinner';
import CountryItem from './CountryItem'
export const CountryList = () => {

    const query="cities";
    const [status, cityList] = useFetchData({query});
    
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
    console.log("Unique country list",uniqueCountryList);
    return(
        <>
            {status==="loading" ? <Spinner/>:(<ul className={styles.countryList}>
           { uniqueCountryList.map((country)=>
           
            <CountryItem key={country.id} country={country}/>
           
           )}
        </ul>)}
        </>
    )
}
