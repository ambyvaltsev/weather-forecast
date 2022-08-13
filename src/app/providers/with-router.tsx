import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => ReactNode) => () => {
  return <BrowserRouter basename="/weather-forecast">{component()}</BrowserRouter>;
};
