/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { BackButton } from "./BackButton";
import styles from "./Form.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useURLposition } from "./useURLposition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "./context/citiesProvider";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [searchParams, setSearchParams]= useSearchParams();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLposition();
  const [isLeodingGeoCoding,setIsLeodingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState()
  const [geocodingError, setGeocodingError] = useState("")
  const {cityList, dispatch, status, createCity} = useCities();
  



  

  useEffect(()=>{
    if(!lat&&!lng){return}

      const fetchCityData = async ()=>{
        try{ 
          setGeocodingError("");
          setIsLeodingGeoCoding(true);
          const response = await fetch (`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)

          if (!response.ok){
            throw Error (`couldnt fetch geoLocation data at Lat: ${lat} and Lng: ${lat}`)
          }

          const jsonData = await response.json()
          if(!jsonData.countryCode){
            throw new Error("Not a city, Please select another location")
          }
          console.log(jsonData);
          setIsLeodingGeoCoding(false);
          setCityName(jsonData.city||"");
          setCountryName(jsonData.countryName)

          setEmoji(convertToEmoji(jsonData.countryCode));
        }catch(error){
          console.error(error.message);
          setGeocodingError(error.message)
          
        }
      }

      fetchCityData();
   
    
  },[lat, lng])

  const uniqueCityCheck = (newCityParam)=>{
    return cityList.some(city=> city.cityName === newCityParam.cityName)
  }
  

  const handleSubmitAddCity = (e) =>{
    e.preventDefault();
    if(!cityName||!date){
      return;
    }
    const newCity={
      cityName: cityName,
      country: countryName
      ,
      emoji: emoji,
      date: date,
      notes: notes,
      position:{
        lat:lat,
        lng:lng
      },
      
    }
    console.log(newCity)
    
    if(uniqueCityCheck(newCity)===false){
      const newCityList= [...cityList, newCity]
      dispatch({type:"updateCityList", payload:newCityList})
      createCity(newCity);
      if(status==="ready"){
        navigate('/app/cities')
      }
      
    }else{
      return(
        <>
        {setGeocodingError("City is already in list")}
        {console.log("Duplicate")}
        
        </>
      )
      
    }

    
    
  }


  if(geocodingError) {
    return (
      <>
    <Message message={geocodingError}/>
    <BackButton/>
    </>
    )
  }

  if(!lat&&!lng){
    return( <Message message="Start by selecting a city"/>)
  }

  return (
    <>
    
    {isLeodingGeoCoding === true ?<Spinner/>:
    <form onSubmit={handleSubmitAddCity} className={`${styles.form} ${status==="loading"?styles.loading:""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
      <label htmlFor="date">When did you go to {cityName}?</label>
      <DatePicker
      selected={date}
      dateFormat={"MM/dd/yyyy - h:mm"}
      id="date"  
      showTimeSelect
      onChange={(date) => setDate(date)}>      
      </DatePicker>
        
      </div>
      

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
        
      </div>
    </form>}
    </>
  );
}

export default Form;
