import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetchData } from "./useFetchData";
import styles from "./City.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useCities } from "./context/citiesProvider";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));



function City() {
  const navigate = useNavigate();
  

  const {id} = useParams();
  const query = `cities/${id}`;
  const [status, data] = useFetchData({query});
  const {selectedCity, dispatch} = useCities();
  useEffect (()=>{
  
  if(status==="ready"){
    console.log("selected City", data)
    dispatch({type:"setSelectedCity", payload:data})
    

  }

  },[data, status, query, id, dispatch])
  
  
  

  console.log("selected city: ", selectedCity)

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
