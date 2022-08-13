import { Route } from "react-router-dom";
import { Routes } from "../router";



export const mapRoutes = (routes: Routes) => {
  function mapFunc(routes: Routes) {
    return routes.map((route, index) => {
      return (<Route key={index} path={route.path} element={route.element}>
        {route.child ? mapFunc(route.child) : null}
      </Route>)
    });
  }
  return mapFunc(routes);
};