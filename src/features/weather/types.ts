export interface IReceivedWeather {
  dt_txt: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
  visibility: number;
  weather: Array<{ description: string; icon: string }>;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  rain?: { "1h"?: number; "3h"?: number };
  snow?: { "1h"?: number; "3h"?: number };
}

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
export interface IStateWeather {
  day: string;
  forecast: IWeather[];
  weather: IWeather;
}
