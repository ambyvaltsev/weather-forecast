import { FC } from "react";
import s from "./LocationInput.module.scss";

interface ILocationInputProps {
  location: string;
  setIsActive: (state: boolean) => void;
  setLocation: (state: string) => void;
}

export const LocationInput: FC<ILocationInputProps> = ({ location, setIsActive, setLocation }) => {

  return (
    <input
      type="search"
      className={s.location__input}
      placeholder="Search"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      onFocus={() => setIsActive(true)}
    />
  );
};
