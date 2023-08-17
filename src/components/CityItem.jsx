
/* eslint-disable react/prop-types */

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

import styles from './CityItem.module.css'
export const CityItem = ({city,setCityToBeDeletedID}) => {
    
    return(
        <li className={styles.cityItem}>
            {console.log(city)}
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button onClick={()=>setCityToBeDeletedID(city.id)} className={styles.deleteBtn}>&times;</button>
            
        </li>
    )
}
