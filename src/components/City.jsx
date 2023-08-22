import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchData } from "./useFetchData";
import styles from "./City.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));



function City() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState();

  const {id} = useParams();
  console.log(typeof(id))
  const query = `cities/${id}`;
    const [status, cityList] = useFetchData({query});
  console.log(status)
  useEffect (()=>{
  
  if(status==="ready"){
    console.log("cityList", cityList)

    const city = cityList.find(
    city => city.id === Number(id));

    setSelectedCity(city);

  }

  },[cityList,selectedCity,status ,id])
  
  
  

  console.log("selected city:", selectedCity)

  console.log("From useParams",id);

  

  // TEMP DATA
  const currentCity = {
    cityName: selectedCity?.cityName,
    emoji: selectedCity?.emoji,
    date: selectedCity?.date,
    notes: selectedCity?.notes,
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
        onClick={()=>navigate(-1)}
        type={"back"}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
