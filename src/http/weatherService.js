import axios from "axios";

export function getWeatherCity(queryString) {
    return axios.get(`http://api.geonames.org/weatherJSON?${queryString}`);
}