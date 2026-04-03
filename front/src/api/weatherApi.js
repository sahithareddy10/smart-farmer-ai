import API from "./api";

export const getWeather = (city) => {
  return API.get(`/weather?city=${city}`);
};