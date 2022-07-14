import { FC, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { CurrentWeather } from "../../../components/currentWeather/CurrentWeather";
import { Forecast } from "../../../components/forecast/Forecast";
import s from "./LocalWeather.module.scss";
import { useActions } from "../../../hooks/useActions";

export const LocalWeather: FC = () => {
  const { getWeather } = useActions();
  const weather = useAppSelector((state) => state.weather.entities.weather);
  const { coords, localLocation } = useAppSelector((state) => state.location.entities);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      getWeather(localLocation);
    }
  }, [coords]);

  return (
    <div className={s.container}>
      {localLocation && (
        <>
          <CurrentWeather localLocation={localLocation} weather={weather} />
          <Forecast />
        </>
      )}
    </div>
  );
};
