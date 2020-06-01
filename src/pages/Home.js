import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { validatorCityName, menageStationData} from "./pagesUtils";
import { MapContainer } from "../components/MapContainer"
import { BarTemperature } from "../components/BarTemperature";
import { getCityInfo } from "../http/cityService";
import { getWeatherCity } from "../http/weatherService";
import imageSearch from "../img/search.png"

/**
 * Home page
 */

export function Home() {
  const [weatherCity, setWeatherCity] = useState(null);
  const [city, setCity] = useState("");
  const [storedCities, setStoredCities] = React.useState([]);
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  
  useEffect(() => { 
    // Read history cities from localstorage
    setStoredCities( JSON.parse(localStorage.getItem('cityHistory')) || [] );
    return;
  }, []);

  const handleCityData = formData => {
    // Call city service
    getCityInfo(city)
      .then(response => {
        // Log to console service response data
        console.log("SERVICE RESPONSE DATA:");
        console.log(JSON.stringify(response.data));

        if (response.data.totalResultsCount === 0 || !response.data.geonames[0].hasOwnProperty("bbox")){
          setError("name", "backend", "City not found");
          return;
        }

        const date = new Date();
        let weatherCity = {"temperature":0, "humidity":0, "windSpeed":0, "lat": response.data.geonames[0].lat, "lng":response.data.geonames[0].lng, "date":`${date.getUTCDate()}/${date.getMonth()+1}/${date.getFullYear()}`, "listStation": null};

        // Call wheather service
        getWeatherCity(`north=${response.data.geonames[0].bbox.north}&south=${response.data.geonames[0].bbox.south}&east=${response.data.geonames[0].bbox.east}&west=${response.data.geonames[0].bbox.west}&username=${process.env.REACT_APP_SERVICE_USER_NAME}`)
        .then(response => {
          // Log to console service response data
          console.log("SERVICE RESPONSE DATA:");
          console.log(JSON.stringify(response.data));

          weatherCity.listStation = response.data.weatherObservations;
          const numWeatherObservations = weatherCity.listStation.length;

          if (numWeatherObservations === 0){
            setError("name", "backend", `${city}, wheather not available`);
            return;
          }

          weatherCity = menageStationData(weatherCity);
         
          // Save city searched in the localStorage (menagement history)
          localStorage.setItem("cityHistory", JSON.stringify([city, ...storedCities.filter(elementCity => elementCity !== city),]));
          
          setWeatherCity(weatherCity);
        });
      })
      .catch(error => {
        setError("name", "backend", error.message);
      });
  };

  return (
    <React.Fragment>
      <main className="centered-container-home">
      {!weatherCity ? (
        <section className="minWidth centered-container">
          <h1 className="f-s-xl txtCenter">
            Welcome to de CityWeather Application
          </h1>
          <p className="f-s-l txtCenter">
            Get access to the city weather!
          </p>
          <form onSubmit={handleSubmit(handleCityData)}>
            <div className="searchComponent m-t-xl">
              <input
                className="searchCity"
                list="storedCities"
                ref={register(validatorCityName)}
                name="name"
                id="name"
                type="text"
                value={city}
                placeholder="City name"
                onChange={e => setCity(e.target.value)}
              ></input>
              <datalist id="storedCities">
                {storedCities.map(element => (
                 <option key={element} value={element}>
                   {element}
                 </option>
                ))}
              </datalist>
              {errors.name && (
                <span className="errorMessageCity">
                  {errors.name.message}
                </span>
              )}
              <div className="buttonSearch">
                <button
                  type="submit"
                  className="btn"
                  disabled={formState.isSubmitting}
                >
                  Find
                </button>
              </div>
            </div>
          </form>
        </section>
      ) :
      (
        <section className="minWidth centered-container">
          <span className="bordered">
            <div className="results-grid">
              <div className="div2 flexCol"> 
                <Link to="/">
                  <img src={imageSearch} title="Search" alt="Go to home"/>
                </Link>
              </div>
              <h1 className="div1 f-s-xxl capitalize f-c-fourgray">{city}</h1>
              <div className="div3 f-c-fourgray">{ weatherCity.date }</div>
              <div className="div4 f-s-xxl">{weatherCity.temperature}&#176;C</div>
              <ul className="div5 f-s-s m-t-lg">
                <li className="f-c-fourgray">{`Humidity: ${weatherCity.humidity}%`}</li>
                <li className="f-c-fourgray">{`Wind: ${weatherCity.windSpeed} km/h`}</li>
              </ul>
              <div className="div6"><BarTemperature temperature={weatherCity.temperature} /></div>
            </div>
            <div className="flexRow" >
              <MapContainer weatherCity={weatherCity} />
            </div>
          </span>
        </section>
      )}
      </main>
    </React.Fragment>
  );
}