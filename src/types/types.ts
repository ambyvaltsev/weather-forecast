

export interface ReceivedWeather {
  clouds: { all: number }
  dt: number
  dt_txt: string
  main: {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
  };
  pop: number
  visibility: number
  weather: Array<{ id: number; main: string; description: string; icon: string }>
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  rain?: { '1h'?: number, '3h'?: number,}
  snow?: {'1h'?: number, '3h'?: number,}
}

export interface ISuggestion {
  data: {city: string | null}
}


