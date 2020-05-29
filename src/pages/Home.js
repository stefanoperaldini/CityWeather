import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { validatorCityName } from "./pagesUtils";
import { Header } from "../components/Header";
import { getCityInfo } from "../http/cityService";
import { getWeatherCity } from "../http/weatherService";

/**
 * Home page
 */

export function Home() {
  const [weatherCity, setWeatherCity] = useState(null);
  const [city, setCity] = useState("");
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: "onBlur"
  });
  //const history = useHistory();

  useEffect(() => {
    console.log("Read cities stored");
    // read cities stored
    return;
  }, []);

  const handleCityData = formData => {
    console.log("handleCityData");
    getCityInfo(city)
      .then(response => {
        // FIXME check geonames
        getWeatherCity(`north=${response.data.geonames[0].bbox.north}&south=${response.data.geonames[0].bbox.south}&east=${response.data.geonames[0].bbox.east}&west=${response.data.geonames[0].bbox.west}&username=${process.env.REACT_APP_SERVICE_USER_NAME}`)
        .then(response => {
          const weatherObservations = response.data.weatherObservations;
          const weatherCity = {"temperature":0, "humidity":0, "windSpeed":0,};
          console.log(weatherObservations);
          const numWeatherObservations = weatherObservations.length;
          for(let i = 0; i < numWeatherObservations; i++) {
            weatherCity.temperature += parseInt(weatherObservations[i].temperature);
            weatherCity.humidity += parseInt(weatherObservations[i].humidity);
            weatherCity.windSpeed += parseInt(weatherObservations[i].windSpeed);
          }
          weatherCity.temperature = Math.round(weatherCity.temperature / numWeatherObservations);
          weatherCity.humidity = Math.round(weatherCity.humidity / numWeatherObservations);
          weatherCity.windSpeed = Math.round(weatherCity.windSpeed / numWeatherObservations);

          setWeatherCity(weatherCity);
        });
      })
      .catch(error => {
        setError("name", "backend", error.message);
      });
  };
  return (
    <React.Fragment>
      <Header />
      <main className="centered-container-home m-t-md p-r-md p-l-md">
        <section className="allWidth centered-container">
          <h1 className="f-s-xxl txtCenter">
            Find the city
          </h1>
          <p className="f-s-l txtCenter">
            Get access to the city weather
          </p>
          <form onSubmit={handleSubmit(handleCityData)}>
            <div>
              <input
                className="searchCity"
                list="citiesName"
                ref={register(validatorCityName)}
                name="name"
                id="name"
                type="text"
                value={city}
                placeholder="City name"
                onChange={e => setCity(e.target.value)}
              ></input>
              {errors.name && (
                <span className="errorMessageCity">
                  {errors.name.message}
                </span>
              )}
              <div className="btn-container buttonSearch">
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

        {weatherCity && 
          (
           <section className="allWidth centered-container">
           <h1 className="f-s-xxl txtCenter">{city}</h1>
           <p className="f-s-l txtCenter">
             <ul>
                <li>{`Temperature:${weatherCity.temperature}`}</li>
                <li>{`Humidity:${weatherCity.humidity}`}</li>
                <li>{`Wind:${weatherCity.windSpeed}`}</li>
             </ul>
           </p>
           </section>
          )
        }
      </main>
    </React.Fragment>
  );
}