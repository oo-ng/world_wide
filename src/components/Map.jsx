/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, TileLayer, useMap, Popup } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState} from 'react'
import 'leaflet/dist/leaflet.css';

export const Map = () => {
    const navigate= useNavigate()
    const[searchParams, setSearchParams]=useSearchParams();
    const [position, setPosition ]= useState([51.505, -0.09])
    

    useEffect(()=>{
    if (searchParams.has('lat')||searchParams.has('lng')){
        const lat = parseFloat(searchParams.get('lat'));
        const lng = parseFloat(searchParams.get('lng'));
            if (!isNaN(lat) && !isNaN(lng)) {
                console.log(lat)
                console.log(lng)
                setPosition([lat, lng]);
            }
    }
    
    },[searchParams])
    
    
    return(
        <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
        <MapContainer className={styles.map} center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {<Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>}
        </MapContainer>
        </div>
    )
}
