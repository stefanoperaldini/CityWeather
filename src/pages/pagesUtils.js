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


export {
  validatorCityName
};
