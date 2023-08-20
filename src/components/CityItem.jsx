
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

import styles from './CityItem.module.css'
export const CityItem = ({city,handleDeleteCityClick}) => {
    
    return(
        <Link to ={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={styles.cityItem}>
            {console.log(city.position)}
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button onClick={()=>handleDeleteCityClick(city.id)} className={styles.deleteBtn}>&times;</button>
            
        </Link>
    )
}
