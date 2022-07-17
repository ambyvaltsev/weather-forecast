import { useEffect } from "react";
import { useAppSelector } from "./redux";
import { saveState, loadState } from "../utils/localStorage";
import { useActions } from "./useActions";

export const useLocalStorage = () => {
  const { loadFavoritesLocations } = useActions();
  const locations = useAppSelector((state) => state.location.entities.favoritesLocations);

  useEffect(() => {
    loadFavoritesLocations(loadState());
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => saveState(locations), 0);
    return () => clearTimeout(timerId);
  }, [locations]);
};
