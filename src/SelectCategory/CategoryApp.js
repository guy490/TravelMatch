import "./styles/CategoryApp.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ShowCategories from "./component/ShowComponents/ShowCategories";
import ShowSubCategories from "./component/ShowComponents/ShowSubCategories";
import ShowPlaces from "./component/ShowComponents/ShowPlaces";
import ShowEvents from "./component/ShowComponents/ShowEvents";

const CategoryApp = () => {
  return (
    <Switch>
      <Route path="/Category" exact component={ShowCategories} />
      <Route path="/ShowPlaces/Events" exact component={ShowEvents} />
      <Route path="/ShowPlaces/:category" exact component={ShowSubCategories} />
      <Route
        path="/ShowPlaces/:category/:subCategory"
        exact
        component={ShowPlaces}
      />
    </Switch>
  );
};

export default CategoryApp;
