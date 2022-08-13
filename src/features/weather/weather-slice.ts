import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IReceivedWeather, IWeather, IStateWeather } from "./types";
import { API_WEATHER_KEY, formatWeatherData, getDirection} from '../../utils'


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
    const forecasts = dataForecast.data.list.map((forecast: IReceivedWeather) => {
      const direction = getDirection(forecast);
      return formatWeatherData(forecast, direction);
    });
    const direction = getDirection(dataWeather.data);
    const weather = formatWeatherData(dataWeather.data, direction);
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
    const weather = formatWeatherData(data, direction);
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
