import { useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useActions } from "../../../hooks/useActions";


export const useUpdateSuggestions = (location: string) => {
  const {checkingInput} = useActions()
  const debounced = useDebounce(location, 300)

  useEffect(() => {
    if (debounced) {
      checkingInput(debounced)
    }
  }, [debounced]);
};
