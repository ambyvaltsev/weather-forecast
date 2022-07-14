import { weatherSlice } from "./weather/weather-slice";
import { locationSlice } from "./location/location-slice";
import { getWeather, getFavoriteLocWeather } from "./weather/weather-slice";
import { getGeolocation, checkingInput } from "./location/location-slice";


export const allActions = {
  ...weatherSlice.actions,
  ...locationSlice.actions,
  getWeather,
  getFavoriteLocWeather,
  getGeolocation,
  checkingInput
};
