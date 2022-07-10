import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getGeolocation } from "./location-slice";

export interface ICoords {
  latitude: number | null;
  longitude: number | null;
}
export const useGetCoords = () => {
  const dispatch = useAppDispatch();
  const [coords, setCoords] = useState<ICoords>({ latitude: null, longitude: null });
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (pos.coords) {
          setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        }
      });
    } else {
      // реализовать: предложить выбрать город пользователю самостоятельно в случае отказа определения координат
      setCoords({ latitude: 55.7522, longitude: 37.6156 });
    }
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      dispatch(getGeolocation(coords));
    }
  }, [coords, dispatch]);
};
