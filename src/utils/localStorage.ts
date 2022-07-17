


export const loadState = () => {
  try {
    const saveState = localStorage.getItem("weather-forecast");

    if (saveState === null) {
      return undefined;
    }

    return JSON.parse(saveState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: string[]) => {
  const stateToBeSaved = JSON.stringify(state);
  localStorage.setItem("weather-forecast", stateToBeSaved);
};

export const removeState = () => {
  localStorage.removeItem("weather-forecast");
};
