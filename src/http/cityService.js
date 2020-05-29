import axios from "axios";

export function getCityInfo(cityName) {
    return axios.get(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=20&startRow=0&lang=en&isNameRequired=true&style=FULL&username=${process.env.REACT_APP_SERVICE_USER_NAME}`);
}
