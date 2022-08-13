import { FC, useEffect } from "react";
import { useAppSelector, useActions } from "../../hooks";
import { CurrentWeather } from "../../components/currentWeather/CurrentWeather";
import { Forecast } from "./components/forecast/Forecast";
import s from "./LocalWeather.module.scss";


export const LocalWeather: FC = () => {
  const { getWeather } = useActions();
  const { coords, localLocation } = useAppSelector((state) => state.location.entities);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      getWeather(localLocation);
    }
  }, [coords]);

  return (
    <div className={s.container}>
      <div className={s.weather__now}>
        <h1 className={s.location}>{localLocation}</h1>
        <CurrentWeather/>
      </div>
      <Forecast />
    </div>
  );
};
