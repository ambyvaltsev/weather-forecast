import s from "./Location.module.scss";
import { FC, useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useGetCoords } from "./useGetCoords";
import { AiOutlineSearch } from "react-icons/ai";
import { LocationInput } from "../../components/locationInput/LocationInput";
import { LocationTooltip } from "../../components/locationTooltip/LocationTooltip";
import { useNavigate } from "react-router-dom";
import { useUpdateSuggestions } from "./useUpdateSuggestions";

export const Location: FC = () => {
  const tooltip = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();
  const { suggestions, selectedLocation, favoritesLocations } = useAppSelector(
    (state) => state.location.entities
  );
  const [location, setLocation] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (selectedLocation) {
      navigator(`/${selectedLocation.split(" ").join("_")}/now`);
      setLocation("");
    }
  }, [selectedLocation]);

  const blur = (e: any) => {
    if (!e.path.includes(tooltip.current)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", blur);
    return () => {
      document.removeEventListener("click", blur);
    };
  }, []);

  useGetCoords();

  useUpdateSuggestions(location);

  return (
    <div className={s.container} ref={tooltip}>
      <form className={s.search__location} name="search__location">
        <AiOutlineSearch className={s.location__icon} />
        <LocationInput location={location} setIsActive={setIsActive} setLocation={setLocation} />
        {isActive && suggestions && (favoritesLocations.length > 0 || location.length > 0) && (
          <LocationTooltip suggestions={suggestions} setIsActive={setIsActive} location={location} />
        )}
      </form>
    </div>
  );
};
