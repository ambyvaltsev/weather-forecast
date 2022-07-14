import { configureStore } from "@reduxjs/toolkit";
import { locationSlice } from "../features/location/location-slice";
import { weatherSlice } from "../features/weather/weather-slice";
import { saveState, loadState } from "../utils/localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    weather: weatherSlice.reducer,
  },
  preloadedState,
});

store.subscribe(() => saveState(store.getState().location.entities));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
