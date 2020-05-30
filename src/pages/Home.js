import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { validatorCityName } from "./pagesUtils";
import MapContainer from "../components/MapContainer"
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
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  
  const [storedCities, setStoredCities] = React.useState([]);

  useEffect(() => {                   ;
    setStoredCities( JSON.parse(localStorage.getItem('cityHistory')) || [] );
    return;
  }, []);

  const handleCityData = formData => {
    getCityInfo(city)
      .then(response => {
        console.log("SERVICE RESPONSE DATA:");
        console.log(JSON.stringify(response.data));
        if (response.data.totalResultsCount === 0){
          setError("name", "backend", "City not found");
          return;
        }
        getWeatherCity(`north=${response.data.geonames[0].bbox.north}&south=${response.data.geonames[0].bbox.south}&east=${response.data.geonames[0].bbox.east}&west=${response.data.geonames[0].bbox.west}&username=${process.env.REACT_APP_SERVICE_USER_NAME}`)
        .then(response => {
          console.log("SERVICE RESPONSE DATA:");
          console.log(JSON.stringify(response.data));
          const weatherObservations = response.data.weatherObservations;
          const date = new Date();
          const weatherCity = {"temperature":0, "humidity":0, "windSpeed":0, "date":`${date.getUTCDate()}/${date.getMonth()}/${date.getFullYear()}`};
          const numWeatherObservations = weatherObservations.length;
          if (numWeatherObservations !== 0){
            for(let i = 0; i < numWeatherObservations; i++) {
              weatherCity.temperature += parseFloat(weatherObservations[i].temperature);
              weatherCity.humidity += parseFloat(weatherObservations[i].humidity);
              weatherCity.windSpeed += parseFloat(weatherObservations[i].windSpeed);
            }
            weatherCity.temperature = Math.round(weatherCity.temperature / numWeatherObservations);
            weatherCity.humidity = Math.round(weatherCity.humidity / numWeatherObservations);
            weatherCity.windSpeed = Math.round(weatherCity.windSpeed / numWeatherObservations);
          } else {
            weatherCity.temperature = NaN;
            weatherCity.humidity = NaN;
            weatherCity.windSpeed = NaN;
          }
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
        <section className="allWidth centered-container">
          <h1 className="f-s-xxl txtCenter">
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
        <section className="allWidth">
          <h1 className="f-s-xxl txtCenter">{city}</h1>
          {weatherCity.date}
          <Link to="/">
          <img src={imageSearch} title="Image search" alt="Go to home"/>
        </Link>
        { weatherCity.temperature ? (
          <React.Fragment>
          <ul className="f-s-l txtCenter">
          <li>{`Temperature: ${weatherCity.temperature}`}&#176;C</li>
          <li>{`Humidity: ${weatherCity.humidity}%`}</li>
          <li>{`Wind: ${weatherCity.windSpeed} km/h`}</li>
        </ul>
        <BarTemperature />
        </React.Fragment>
        ):
        (
          <p>Weather data not available at this time</p>
          )
        }
        <MapContainer />
        </section>
      )
        }
      </main>
    </React.Fragment>
  );
}