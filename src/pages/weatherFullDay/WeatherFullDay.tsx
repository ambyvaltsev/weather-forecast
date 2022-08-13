import { FC } from "react";
import { useAppSelector } from "../../hooks";
import s from "./WeatherFullDay.module.scss";
import { ForecastColumn } from "../../components/forecastColumn/ForecastColumn";
import { formatter } from "../../utils";



export const WeatherFullDay: FC = () => {
  const day = useAppSelector(state => state.weather.entities.day)
  const forecasts = useAppSelector((state) => state.weather.entities.forecast);
  const forecast = forecasts.filter((forecast) => forecast.date.split(" ")[0] === formatter(day));

  return (
    <div className={s.container}>
      <h6 className={s.windSpeed}>Wind speed, m/s</h6>
      {forecast.map((el) => {
        return <ForecastColumn key={el.date} forecast={el} />;
      })}
    </div>
  );
};
