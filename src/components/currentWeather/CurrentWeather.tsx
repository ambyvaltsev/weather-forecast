import s from "./CurrentWeather.module.scss";
import { FC, useEffect } from "react";
import { IWeather } from "../../features/weather/weather-slice";
import { setBGColor } from "../../helpers/helpers";
interface ICurrentWeatherProps {
  localLocation: string;
  weather: IWeather;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ localLocation, weather }) => {
  useEffect(() => {}, []);

  return (
    <div className={s.container}>
      <h1 className={s.location}>{localLocation}</h1>
      <span className={s.date}>
        {new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
        })}
      </span>
      <div className={s.mainInfo}>
        <span
          className={s.temp}
          style={{ backgroundColor: `${setBGColor(weather.temp)}` }}
        >{`${weather.temp}\u2103`}</span>
        <div className={s.clouds}>
          <img
            src={weather.icon && `http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.clouds}
          />
        </div>
      </div>
      <div className={s.subInfo}>
        <span className={s.name}>Wind:</span>
        <span className={s.value}>
          {weather.windSpeed} m/s / {weather.windDir}
        </span>
      </div>
      <div className={s.subInfo}>
        <span className={s.name}>Pressure:</span>
        <span className={s.value}>{weather.pressure} mm Hg</span>
      </div>
      <div className={s.subInfo}>
        <span className={s.name}>Humidity:</span>
        <span className={s.value}>{weather.humidity}%</span>
      </div>
    </div>
  );
};
