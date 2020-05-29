import axios from "axios";

export function getWeatherCity(queryString) {
    const urlService = `http://api.geonames.org/weatherJSON?${queryString}`; 
    console.log("SERVICE URL:");
    console.log(urlService);
    return axios.get(urlService);
}