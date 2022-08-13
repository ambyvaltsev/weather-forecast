import { IReceivedWeather } from "../features/weather/types";


export const windDirection = [
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

export const getDirection = (data: IReceivedWeather) => {
  const direction = windDirection.find((dir) => data.wind.deg > dir.min && data.wind.deg < dir.max);
  return typeof direction !== "undefined" ? direction.dir : "";
};

export const formatWeatherData = (data: IReceivedWeather, direction: string) => {
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