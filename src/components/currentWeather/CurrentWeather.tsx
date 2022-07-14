import s from "./CurrentWeather.module.scss";
import { FC } from "react";
import { IWeather } from "../../features/weather/types";
import { setTempColor } from "../../utils/tempColor";

interface ICurrentWeatherProps {
  localLocation: string;
  weather: IWeather;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ localLocation, weather }) => {
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
          style={{ backgroundColor: `${setTempColor(weather.temp)}` }}
        >{`${weather.temp}\u2103`}</span>
        <div className={s.clouds}>
          <img
            src={weather.icon && weather.icon}
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
