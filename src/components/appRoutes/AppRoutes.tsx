import { Routes } from "react-router-dom";
import { routes } from "../../router";
import { mapRoutes } from "../../utils";

export const AppRoutes = () => {
  return <Routes> {mapRoutes(routes)}</Routes>;
};
