import { FC, KeyboardEvent } from "react";
import { useAppDispatch } from "../../hooks/redux";
import s from "./LocationInput.module.scss";
import { getSelectedLocation } from "../../features/location/location-slice";

interface ILocationInputProps {
  location: string;
  setIsActive: (state: boolean) => void;
  setLocation: (state: string) => void;
}

export const LocationInput: FC<ILocationInputProps> = ({ location, setIsActive, setLocation }) => {
  const dispatch = useAppDispatch();

  const enterLocation = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.code === "Enter") {
      e.preventDefault();
      dispatch(getSelectedLocation(location));
      setIsActive(false);
    }
  };

  return (
    <input
      type="search"
      className={s.location__input}
      placeholder="Search"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      onKeyDown={enterLocation}
      onFocus={() => setIsActive(true)}
      /* onBlur={blur} */
    />
  );
};
