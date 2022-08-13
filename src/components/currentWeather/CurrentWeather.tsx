import s from "./CurrentWeather.module.scss";
import { FC } from "react";
import { setColorTemp } from "../../utils";
import { useAppSelector } from "../../hooks/redux";

interface ICurrentWeatherProps {
  selected?: boolean;
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ selected }) => {
  const { weather } = useAppSelector((state) => state.weather.entities);
  return (
    <div className={selected ? `${s.container} ${s.selected}` : `${s.container}`}>
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
          style={{ backgroundColor: `${setColorTemp(weather.temp)}` }}
        >{`${weather.temp}\u2103`}</span>
        <div className={s.clouds}>
          <img src={weather.icon && weather.icon} alt={weather.clouds} />
        </div>
      </div>
      <div className={selected ? `${s.subInfo} ${s.selected}` : `${s.subInfo}`}>
        <div className={selected ? `${s.subInfo__item} ${s.selected}` : `${s.subInfo__item}`}>
          <span className={selected ? `${s.item__name} ${s.selected}` : `${s.item__name}`}>Wind:</span>
          <span className={s.item__value}>
            {weather.windSpeed} m/s {weather.windDir}
          </span>
        </div>
        <div className={selected ? `${s.subInfo__item} ${s.selected}` : `${s.subInfo__item}`}>
          <span className={selected ? `${s.item__name} ${s.selected}` : `${s.item__name}`}>Pressure:</span>
          <span className={s.item__value}>{weather.pressure} mm Hg</span>
        </div>
        <div className={selected ? `${s.subInfo__item} ${s.selected}` : `${s.subInfo__item}`}>
          <span className={selected ? `${s.item__name} ${s.selected}` : `${s.item__name}`}>Humidity:</span>
          <span className={s.item__value}>{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
};
