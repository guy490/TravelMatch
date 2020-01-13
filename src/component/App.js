import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowCategories from "./ShowCategories";
import ShowSubCategories from "./ShowSubCategories";
import ShowPlaces from "./ShowPlaces";

const App = () => {
  return (
    <BrowserRouter>
      <div className="ui container">
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={ShowCategories} />
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
      </div>
    </BrowserRouter>
  );
};

export default App;
