import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import s from "./WeatherRest.module.scss";
import { ForecastColumn } from "../forecastColumn/ForecastColumn";
import { formatter } from "../../utils/formatter";

interface IWeatherFullDayProps {
  day: string;
}

export const WeatherFullDay: FC<IWeatherFullDayProps> = ({ day }) => {
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
