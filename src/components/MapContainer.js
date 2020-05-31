import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

export function MapContainer({weatherCity}) {
  const [ selectedStation, setSelectedStation ] = useState({});
 
  const mapStyles = {        
    height: "20rem",
    width: "350px",
    margin: "1rem 1rem",
    align: "center"
  };
  
  const defaultCenter = {
    lat: parseFloat(weatherCity.lat), lng: parseFloat(weatherCity.lng)
  }

  const onSelect = item => {
    setSelectedStation(item);
  }
  
  return (
     <LoadScript
        key={`${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={8}
          center={defaultCenter}>
          {
            weatherCity.listStation.map(station => {
              return (
              <Marker key={station.stationName} 
                position={{ "lat":parseFloat(station.lat), "lng": parseFloat(station.lng) }}
                onClick={() => onSelect(station) }/>
              )
            })
          }
          {
            selectedStation.lat && 
            (
              <InfoWindow
              position={{ "lat":parseFloat(selectedStation.lat), "lng": parseFloat(selectedStation.lng) }}
              clickable={true}
              onCloseClick={() => setSelectedStation({})}
            >
              <p>{selectedStation.stationName}</p>
            </InfoWindow>
            )
         }
          </GoogleMap>
     </LoadScript>
  )
}