export interface ISuggestion {
  data: { city: string | null };
}

export interface ILocation {
  suggestions: string[];
  selectedLocation: string;
  localLocation: string;
  coords: ICoords;
  favoritesLocations: string[];
}

export interface ICoords {
  latitude: number | null;
  longitude: number | null;
}
