import s from "./Header.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";

export const Header: FC = () => {
  const {getSelectedLocation} = useActions()


  return (
    <div className={s.container}>
      <Link to="/">
        <h1 className={s.title} onClick={() => getSelectedLocation("")}>
          Weather forecast
        </h1>
      </Link>
    </div>
  );
};
