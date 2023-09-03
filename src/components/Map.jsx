/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, TileLayer, useMap, Popup, useMapEvent } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState} from 'react'
import 'leaflet/dist/leaflet.css';
import { useCities } from './context/citiesProvider';
import { useGeolocation } from './useGeolocate';
import { Button } from './Button';
import { useURLposition } from './useURLposition';

export const Map = () => {
    const navigate = useNavigate()
    const[searchParams, setSearchParams]=useSearchParams();
    const {status, cityList, dispatch} = useCities();
    const [ position, setPosition ]= useState([51.505, -0.09])
    const {currentPosition, loadingStatus, getLocation} = useGeolocation();

    

    const [lat, lng] = useURLposition();
    

    useEffect(()=>{
        if(!isNaN(lat)&&!isNaN(lng)){
            setPosition([lat,lng]);
        }
        
    },[lat, lng, searchParams])


    useEffect(()=>{
        if(loadingStatus==="ready"){
            console.log(currentPosition)
               setPosition([currentPosition.lat,currentPosition.lng])               
        }
        console.log("status:", loadingStatus)

    },[currentPosition, loadingStatus])

    const handleGetLocation = () => {
        getLocation();
        };
    
 
    
    return(
        
        <div className={styles.mapContainer} >
        {!currentPosition?<Button type='position' onClick={handleGetLocation}>{loadingStatus==="loading"?"Loading...":"Use your Location"}</Button>:""}
        
        
        <MapContainer className={styles.map} center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            { cityList?.map((city)=>
                
                <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                <Popup>
                    <span>{city.emoji}</span>
                    <span>{city.cityName}</span>
                </Popup>
                </Marker>
            )}
            <ChangeCenter position={position}/>
            <DetectClick/>
        </MapContainer>
         
        </div>
    )
}

export function ChangeCenter ({position}) {
    const map =useMap();
    map.setView(position,10)
    return null;
}


export function DetectClick () {
    
    const navigate = useNavigate(); 
     useMapEvent({
        click:(e)=>{
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) 
            
        }      
        }
    )
    return null
    
}

