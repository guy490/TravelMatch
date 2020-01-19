import "../styles/App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowCategories from "./ShowComponents/ShowCategories";
import ShowSubCategories from "./ShowComponents/ShowSubCategories";
import ShowPlaces from "./ShowComponents/ShowPlaces";
import ShowEvents from "./ShowComponents/ShowEvents";

const App = () => {
  return (
    <BrowserRouter>
      {/* <div className="ui container"> */}
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={ShowCategories} />
        <Route path="/ShowPlaces/Events" exact component={ShowEvents} />
        <Route
          path="/ShowPlaces/:category"
          exact
          component={ShowSubCategories}
        />
        <Route
          path="/ShowPlaces/:category/:subCategory"
          exact
          component={ShowPlaces}
        />
      </Switch>
      {/* </div> */}
    </BrowserRouter>
  );
};

export default App;
