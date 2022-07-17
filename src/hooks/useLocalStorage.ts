import { useEffect } from "react";
import { useAppSelector } from "./redux";
import { saveState} from "../utils/localStorage";

export const useLocalStorage = () => {
  const locations = useAppSelector((state) => state.location.entities.favoritesLocations);

  useEffect(() => {
    saveState(locations);
  }, [locations]);
};
