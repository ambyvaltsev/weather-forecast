import { FC, useEffect } from "react";
import { useAppSelector, useActions } from "../../hooks";
import s from "./SelectedWeather.module.scss";
import { Tab } from "../../components/tab/Tab";
import { Outlet } from "react-router-dom";

export const SelectedWeather: FC = () => {
  const { getWeather } = useActions();
  const { selectedLocation } = useAppSelector((state) => state.location.entities);

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  useEffect(() => {
    if (selectedLocation) {
      getWeather(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <div className={s.container}>
      <h5 className={s.title}>
        {selectedLocation && `Weather in ${selectedLocation[0].toUpperCase()}${selectedLocation.slice(1)}`}
      </h5>
      <div className={s.weather}>
        <div className={s.weather__tabs}>
          <Tab day="Now" />
          <Tab date={today} day="Today" />
          <Tab date={tomorrow} day="Tomorrow" />
        </div>
        <div className={s.weather__content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
