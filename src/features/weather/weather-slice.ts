import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ReceivedWeather } from "../../types/types";
const API_WEATHER_KEY = process.env.REACT_APP_API_WEATHER_KEY;

const wind_direction = [
  { dir: "N", min: 348.75, max: 360 },
  { dir: "NNE", min: 0, max: 33.75 },
  { dir: "NE", min: 33.75, max: 56.25 },
  { dir: "ENE", min: 56.25, max: 78.75 },
  { dir: "E", min: 78.75, max: 101.25 },
  { dir: "ESE", min: 101.25, max: 123.75 },
  { dir: "SE", min: 123.75, max: 146.25 },
  { dir: "SEE", min: 146.25, max: 168.75 },
  { dir: "S", min: 168.75, max: 191.25 },
  { dir: "SSW", min: 191.25, max: 213.75 },
  { dir: "SW", min: 213.75, max: 236.25 },
  { dir: "WSW", min: 236.25, max: 258.75 },
  { dir: "W", min: 258.75, max: 281.25 },
  { dir: "WNW", min: 281.25, max: 303.75 },
  { dir: "NNW", min: 326.25, max: 348.75 },
];
const getDirection = (data: ReceivedWeather) => {
  const direction = wind_direction.find((dir) => data.wind.deg > dir.min && data.wind.deg < dir.max);
  return typeof direction !== "undefined" ? direction.dir : "";
};

export interface IWeather {
  date: string;
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDir: string;
  clouds: string;
  rain: number;
  snow: number;
  icon: string;

}
interface IStateWeather {
  day: string;
  forecast: IWeather[];
  weather: IWeather;
}
const formatWeather = (data: ReceivedWeather, direction: string, index: number = 0) => {
  return {
    date: data.dt_txt || " ",
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    pressure: Math.round(data.main.pressure / 1.333),
    windSpeed: data.wind.speed,
    windDir: direction || "",
    clouds: `${data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)}`,
    rain: data.rain?.["1h"] ?? 0,
    snow: data.snow?.["1h"] ?? 0,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, 
  };
};
export const getWeather = createAsyncThunk<{ weather: IWeather; forecasts: IWeather[] }, string>(
  "@@weather/getCurrentWeather",
  async (location) => {
    const urlForecast = new URL(`https://api.openweathermap.org/data/2.5/forecast`);
    const urlWeather = new URL(`https://api.openweathermap.org/data/2.5/weather`);
    urlForecast.searchParams.set("q", location);
    urlWeather.searchParams.set("q", location);
    const forecastConfig = {
      url: urlForecast.href,
      method: "GET",
      params: {
        appid: API_WEATHER_KEY,
        lang: "en",
        units: "metric",
      },
    };
    const weatherConfig = {
      url: urlWeather.href,
      method: "GET",
      params: {
        appid: API_WEATHER_KEY,
        lang: "en",
        units: "metric",
      },
    };

    const [dataWeather, dataForecast] = await Promise.all([axios(weatherConfig), axios(forecastConfig)]);
    const forecasts = dataForecast.data.list.map((forecast: ReceivedWeather, index: number) => {
      const direction = getDirection(forecast);
      return formatWeather(forecast, direction, index);
    });
    const direction = getDirection(dataWeather.data);
    const weather = formatWeather(dataWeather.data, direction);
    return { weather, forecasts };
  }
);
export const getFavoriteLocWeather = createAsyncThunk<IWeather, string>(
  "@@weather/getFavoriteLocWeather",
  async (location) => {
    const urlWeather = new URL(`https://api.openweathermap.org/data/2.5/weather`);
    urlWeather.searchParams.set("q", location);

    const { data } = await axios({
      url: urlWeather.href,
      method: "GET",
      params: {
        appid: API_WEATHER_KEY,
        lang: "en",
        units: "metric",
      },
    });
    const direction = getDirection(data);
    const weather = formatWeather(data, direction);
    return weather;
  }
);

const initialState: IStateWeather = {
  day: "",
  forecast: [],
  weather: {
    date: "",
    temp: 0,
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    windDir: "",
    clouds: "",
    rain: 0,
    snow: 0,
    icon: "",
  },
};

export const weatherSlice = createSlice({
  name: "@@weather",
  initialState: {
    entities: initialState,
    error: null,
    loading: false,
  },
  reducers: {
    setDay: (state, action: PayloadAction<string>) => {
      state.entities.day = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        state.entities.weather = action.payload.weather;
        state.entities.forecast = action.payload.forecasts;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { setDay } = weatherSlice.actions;
