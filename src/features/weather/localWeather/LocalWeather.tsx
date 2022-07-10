import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { CurrentWeather } from "../../../components/currentWeather/CurrentWeather";
import { Forecast } from "../../../components/forecast/Forecast";
import { getWeather } from "../weather-slice";
import s from "./LocalWeather.module.scss";

export const LocalWeather: FC = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather.entities.weather);
  const { coords, localLocation } = useAppSelector((state) => state.location.entities);

  useEffect(() => {}, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      dispatch(getWeather(localLocation));
    }
  }, [coords, dispatch]);

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
