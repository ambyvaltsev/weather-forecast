import s from "./Forecast.module.scss";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { ForecastColumn } from "../forecastColumn/ForecastColumn";

export const Forecast: FC = () => {
  const forecasts = useAppSelector((state) => state.weather.entities.forecast);
  const [hour, setHour] = useState<Date>(new Date());

  useEffect(() => {
    if (forecasts.length) {
      let date = new Date(forecasts[0].date.split(" ").join("T"));
      date.setHours(date.getHours() + 15);
      setHour(new Date(date));
    }
  }, [forecasts]);

  return (
    <div className={s.forecast}>
      <h6 className={s.windSpeed}>Wind speed, m/s</h6>
      {forecasts.map((forecast, index) => {
        let date = new Date(forecasts[index].date.split(" ").join("T"));
        if (date <= hour && index !== 0) {
          return <ForecastColumn key={forecast.date} forecast={forecast} />;
        }
      })}
    </div>
  );
};
