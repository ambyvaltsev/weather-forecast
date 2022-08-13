import s from "./ForecastColumn.module.scss";
import { FC } from "react";
import { setColorTemp } from "../../utils";
import { IWeather } from "../../features/weather/types";

interface IForecastColumnProps {
  forecast: IWeather;
  key: string;
}

export const ForecastColumn: FC<IForecastColumnProps> = ({ forecast }) => {
  return (
    <div className={s.container}>
      <div className={s.time}>{parseInt(forecast?.date?.split(" ")[1])}:00</div>
      <div className={s.clouds}>
        <img
          src={forecast?.icon}
          alt={forecast.clouds}
        />
      </div>
      <div className={s.temp} style={{ backgroundColor: `${setColorTemp (forecast.temp)}` }}>
        {`${forecast?.temp} \u2103`}
      </div>
      <div className={s.wind}>{forecast?.windSpeed}</div>
    </div>
  );
};
