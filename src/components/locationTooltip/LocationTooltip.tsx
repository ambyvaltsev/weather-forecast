import { FC } from "react";
import s from "./LocationTooltip.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { NameTooltip } from "../nameTooltip/NameTooltip";
import { getSelectedLocation } from "../../features/location/location-slice";

interface ILocationTooltipProps {
  location: string;
  suggestions: string[];
  setIsActive: (state: boolean) => void;
}

export const LocationTooltip: FC<ILocationTooltipProps> = ({ suggestions, setIsActive, location }) => {
  const dispatch = useAppDispatch();
  const { favoritesLocations } = useAppSelector((state) => state.location.entities);
  const selectLocation = (e: any) => {
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
      return;
    }
    dispatch(getSelectedLocation(e.target.textContent));
    setIsActive(false);
  };

  return (
    <div className={s.container}>
      {favoritesLocations.length > 0 && <h6>Favorites</h6>}
      {favoritesLocations.map((name) => (
        <NameTooltip key={name} name={name} selectLocation={selectLocation} />
      ))}

      {!suggestions.every((s) => favoritesLocations.includes(s)) && <h6>Search</h6>}
      {suggestions.length !== 0 &&
        suggestions.map((name, index) => {
          if (index < 10 && !favoritesLocations.includes(name)) {
            return <NameTooltip key={name} name={name} selectLocation={selectLocation} />;
          }
        })}
    </div>
  );
};
