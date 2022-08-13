import { CurrentWeather, LocalWeather, SelectedWeather, Weather, WeatherFullDay } from "../pages";

export interface Route {
  path: string,
  element: React.ReactNode,
  child?: Route[]
}

export type Routes = Route[]



export const routes: Routes = [
  {
    path: "/",
    element: <Weather />,
    child: [
      { path: "/", element: <LocalWeather /> },
      {
        path: "/:name",
        element: <SelectedWeather />,
        child: [
          { path: "now", element: <CurrentWeather selected/> },
          { path: "today", element: <WeatherFullDay /> },
          { path: "tomorrow", element: <WeatherFullDay /> },
        ],
      },
    ],
  },
];
