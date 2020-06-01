const validatorCityName = {
  required: "City name is required",
  minLength: {
    value: 2,
    message: "Minimun is 2 characters"
  },
  maxLength: {
    value: 40,
    message: "Maximun is 40 characters"
  }
};

function menageStationData(weatherCity) {
  let numTemperature =0
  let numHumidity = 0;
  let numWindSpeed = 0;

  for(let i = 0; i < weatherCity.listStation.length; i++) {
    if (weatherCity.listStation[i].hasOwnProperty("temperature")){
      weatherCity.temperature += parseFloat(weatherCity.listStation[i].temperature);
      numTemperature += 1;

    }
    if (weatherCity.listStation[i].hasOwnProperty("humidity")){
      weatherCity.humidity += parseFloat(weatherCity.listStation[i].humidity);
      numHumidity += 1;
    }
    if (weatherCity.listStation[i].hasOwnProperty("windSpeed")){
      weatherCity.windSpeed += parseFloat(weatherCity.listStation[i].windSpeed);
      numWindSpeed += 1;
    }
  }

  if (numTemperature !== 0){
    weatherCity.temperature = Math.round(weatherCity.temperature / numTemperature);
  }else{
    weatherCity.temperature = "--"
  }

  if (numHumidity !== 0){
    weatherCity.humidity = Math.round(weatherCity.humidity / numHumidity);
  }else{
    weatherCity.humidity = "--"
  }

  if (numWindSpeed !== 0){
    weatherCity.windSpeed = Math.round(weatherCity.windSpeed / numWindSpeed);
  }else{
    weatherCity.windSpeed = "--"
  }
  
  return weatherCity;
}


export {
  menageStationData,
  validatorCityName
};
