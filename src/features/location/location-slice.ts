import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ISuggestion, ILocation, ICoords } from "./types";
import { API_KEY_GEO } from "../../utils";

export const getGeolocation = createAsyncThunk<
  { localLocation: string; coords: ICoords },
  ICoords,
  { rejectValue: string }
>("@@location/getGeolocation", async (coords) => {
  const query = { lat: coords.latitude, lon: coords.longitude };
  const { data } = await axios({
    url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Accept: "application/json",
      Authorization: "Token " + API_KEY_GEO,
    },
    data: query,
  });
  const localLocation = data.suggestions[0].value.split(", ")[0].slice(2);
  return { localLocation, coords };
});
export const checkingInput = createAsyncThunk<string[], string>("@@location/checkingInput", async (city) => {
  const { data } = await axios({
    url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + API_KEY_GEO,
    },
    data: { query: city },
  });

  let suggestions;
  if (data.suggestions.length) {
    suggestions = data.suggestions
      .filter((sug: ISuggestion) => sug.data.city)
      .map((city: ISuggestion) => city.data.city);
  }
  return suggestions;
});
const initialState: ILocation = {
  favoritesLocations: [],
  suggestions: [],
  selectedLocation: "Москва",
  localLocation: "",
  coords: { latitude: null, longitude: null },
};

export const locationSlice = createSlice({
  name: "@@location",
  initialState: {
    entities: initialState,
    error: null,
    loading: false,
  },
  reducers: {
    getSelectedLocation(state, action: PayloadAction<string>) {
      state.entities.selectedLocation = action.payload;
    },
    addFavoriteLocation(state, action: PayloadAction<string>) {
      if (!state.entities.favoritesLocations.includes(action.payload)) {
        state.entities.favoritesLocations.push(action.payload);
      }
    },
    removeFavoriteLocation(state, action: PayloadAction<string>) {
      state.entities.favoritesLocations = state.entities.favoritesLocations.filter(
        (location) => location !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocation.fulfilled, (state, action) => {
        state.entities.localLocation = action.payload.localLocation;
        state.entities.coords = action.payload.coords;
      })
      .addCase(checkingInput.fulfilled, (state, action) => {
        state.entities.suggestions = [...new Set(action.payload)];
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { getSelectedLocation, addFavoriteLocation, removeFavoriteLocation } = locationSlice.actions;
