import { FC, useState, useEffect } from "react";
import s from "./NameLocationTooltip.module.scss";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { addFavoriteLocation, removeFavoritesLocation } from "../../features/location/location-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getFavoriteLocWeather } from "../../features/weather/weather-slice";
import { setBGColor } from "../../helpers/helpers";
interface INameTooltip {
  selectLocation: (e: any) => void
  name: string
}
export const NameLocationTooltip: FC<INameTooltip> = ({ selectLocation, name }) => {
  const [weather, setWeather] = useState<string>("");
  const dispatch = useAppDispatch();
  const { favoritesLocations } = useAppSelector((state) => state.location.entities);

  const selectFavotiteLocation = (e: any) => {
    e.stopPropagation();
    !favoritesLocations.includes(name)
      ? dispatch(addFavoriteLocation(name))
      : dispatch(removeFavoritesLocation(name));
  };
  useEffect(() => {
    if (favoritesLocations.includes(name)) {
      dispatch(getFavoriteLocWeather(name))
        .unwrap()
        .then((res) => setWeather(String(res.temp)));
    }
  }, [name]);
  return (
    <div className={s.container} onClick={selectLocation}>
      <span id="icon" className={s.icon} onClick={selectFavotiteLocation}>
        {favoritesLocations.includes(name) ? <AiFillStar /> : <AiOutlineStar />}
      </span>
      <span>{name}</span>
      {weather && (
        <div
          className={s.temp}
          style={{ backgroundColor: `${setBGColor(+weather)}` }}
        >{`${weather}\u2103`}</div>
      )}
    </div>
  );
};
