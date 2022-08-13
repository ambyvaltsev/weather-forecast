import { FC } from "react";
import s from "./Weather.module.scss";
import { Outlet } from "react-router-dom";
import { Location } from "./components/location/Location";


export const Weather: FC = () => {
  return (
    <div className={s.container}>
      <Location/>
      <Outlet />
    </div>
  );
};
