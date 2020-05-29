const validatorCityName = {
  required: "City name is required",
  minLength: {
    value: 2,
    message: "Minimun is 2 characters"
  },
  maxLength: {
    value: 60,
    message: "Maximun is 60 characters"
  }
};

export {
  validatorCityName
};
