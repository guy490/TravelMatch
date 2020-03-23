import "./CategoryManagmentApp.css";
import React from "react";
import { Switch } from "react-router-dom";
import ShowCategories from "./MainCategories/ShowCategories";
import ShowSubCategories from "./SubCategories/ShowSubCategories";
import ShowPlaces from "./PlacesList/ShowPlaces";
import ShowEvents from "./ShowEvents";
import { ProtectedRoute } from "../Generals/ProtectedRoute";

const CategoryApp = () => {
  return (
    <Switch>
      <ProtectedRoute path="/Category" exact component={ShowCategories} />
      <ProtectedRoute path="/ShowPlaces/Events" exact component={ShowEvents} />
      <ProtectedRoute
        path="/ShowPlaces/:category"
        exact
        component={ShowSubCategories}
      />
      <ProtectedRoute
        path="/ShowPlaces/:category/:subCategory"
        exact
        component={ShowPlaces}
      />
    </Switch>
  );
};

export default CategoryApp;
