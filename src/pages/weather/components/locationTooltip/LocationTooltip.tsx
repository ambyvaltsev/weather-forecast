import { FC } from "react";
import s from "./LocationTooltip.module.scss";
import { useAppSelector, useActions } from "../../../../hooks";
import { NameLocationTooltip } from "../nameLocationTooltip/NameLocationTooltip";

interface ILocationTooltipProps {
  location: string;
  suggestions: string[];
  setIsActive: (state: boolean) => void;
}

export const LocationTooltip: FC<ILocationTooltipProps> = ({ suggestions, setIsActive }) => {
  const {getSelectedLocation} = useActions()
  const { favoritesLocations } = useAppSelector((state) => state.location.entities);
  const selectLocation = (e: any) => {
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
      return;
    }
    getSelectedLocation(e.target.textContent);
    setIsActive(false);
  };

  return (
    <div className={s.container}>
      {favoritesLocations.length > 0 && <h6>Favorites</h6>}
      {favoritesLocations.map((name) => (
        <NameLocationTooltip key={name} name={name} selectLocation={selectLocation} />
      ))}

      {!suggestions.every((s) => favoritesLocations.includes(s)) && <h6>Search</h6>}
      {suggestions.length !== 0 &&
        suggestions.map((name, index) => {
          if (index < 10 && !favoritesLocations.includes(name)) {
            return <NameLocationTooltip key={name} name={name} selectLocation={selectLocation} />;
          }
        })}
    </div>
  );
};
