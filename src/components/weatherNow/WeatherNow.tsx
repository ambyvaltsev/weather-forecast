import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import s from "./WeatherNow.module.scss";

export const WeatherNow: FC = () => {
  const { weather } = useAppSelector((state) => state.weather.entities);

  return (
    <div className={s.container}>
      <div className={s.date}>
        {new Date().toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "numeric",
        })}
      </div>
      <div className={s.temp}>{`${weather.temp}\u2103`}</div>
      <div className={s.clouds}>{weather.clouds}</div>
      <div className={s.details}>
        <div className={s.detail}>
          <h6 className={s.detail__name}>Wind</h6>
          <span className={s.detail__value}>{weather.windSpeed} m/s / {weather.windDir}</span>
        </div>
        <div className={s.detail}>
          <h6 className={s.detail__name}>Pressure</h6>
          <span className={s.detail__value}>{weather.pressure} mm Hg</span>
        </div>
        <div className={s.detail}>
          <h6 className={s.detail__name}>Humidity</h6>
          <span className={s.detail__value}>{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
};
