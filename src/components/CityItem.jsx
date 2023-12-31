
/* eslint-disable react/prop-types */
import styles from './CityItem.module.css'
import { useCities } from './context/citiesProvider';
import { Link } from 'react-router-dom';
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const CityItem = ({city,handleDeleteCityClick}) => 
{
  const {selectedCity} = useCities();
    
    return(
      <li >
        <Link to ={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} 
        className={ `${styles.cityItem} ${selectedCity.id===city.id ? styles['cityItem--active']: ""}`}>
            {console.log(city.position)}
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button onClick={(event)=>{handleDeleteCityClick(city.id);
            event.stopPropagation();
            event.preventDefault();}}
            className={styles.deleteBtn}>&times;</button>
        </Link>
      </li>
    )
}
