import { FC } from "react";
import { useAppSelector, useActions } from "../../hooks";
import s from "./Tab.module.scss";
import { NavLink } from "react-router-dom";

interface ITabProps {
  date?: Date;
  day: string;
}

export const Tab: FC<ITabProps> = ({ date, day }) => {
  const { setDay } = useActions();
  const { weather } = useAppSelector((state) => state.weather.entities);
  const { temp } = weather;

  return (
    <NavLink to={day} className={s.container} onClick={() => setDay(day)}>
      <h6 className={s.date}>{day}</h6>
      <span className={s.time}>
        {date
          ? date.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
            })
          : `${new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}`}
      </span>
      {day === "now" && <div className={s.temp}>{`${temp}\u2103`}</div>}
    </NavLink>
  );
};
