import s from "./ForecastColumn.module.scss";
import { FC } from "react";
import { setBGColor } from "../../helpers/helpers";
import { IWeather } from "../../features/weather/weather-slice";
interface IForecastColumnProps {
  forecast: IWeather;
  key: string;
}

export const ForecastColumn: FC<IForecastColumnProps> = ({ forecast }) => {
  return (
    <div className={s.container}>
      <div className={s.time}>{forecast.date && parseInt(forecast.date?.split(" ")[1])}:00</div>
      <div className={s.clouds}>
        <img
          src={forecast.icon && `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.clouds}
        />
      </div>
      <div className={s.temp} style={{ backgroundColor: `${setBGColor(forecast.temp)}` }}>
        {forecast.temp && `${forecast.temp} \u2103`}
      </div>
      <div className={s.wind}>{forecast.windSpeed && forecast.windSpeed}</div>
    </div>
  );
};
