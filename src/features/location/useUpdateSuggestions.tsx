import { useAppDispatch } from "../../hooks/redux";
import { checkingInput } from "./location-slice";
import { debounce } from "../../helpers/helpers";
import { useEffect } from "react";

export const useUpdateSuggestions = (location: string) => {
  const dispatch = useAppDispatch();
  let updateSuggestios = () => {
    dispatch(checkingInput(location));
  };

  updateSuggestios = debounce(updateSuggestios, 300);

  useEffect(() => {
    if (location) {
      updateSuggestios();
    }
  }, [location]);
};
