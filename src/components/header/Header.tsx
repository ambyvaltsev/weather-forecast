import s from "./Header.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { getSelectedLocation } from "../../features/location/location-slice";
import { useAppDispatch } from "../../hooks/redux";
export const Header: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.container}>
      <Link to="/">
        <h1 className={s.title} onClick={() => dispatch(getSelectedLocation(""))}>
          Weather forecast
        </h1>
      </Link>
    </div>
  );
};
