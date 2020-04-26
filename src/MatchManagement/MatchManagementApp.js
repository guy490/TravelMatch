import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Generals/ProtectedRoute";
import DisplayMatches from "./DisplayMatches/DisplayMatches";
import DisplayMyMatches from "./DisplayMyMatches/DisplayMyMatches";

const MatchManagementApp = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/Matches/:userID&:placeID&:latitude&:longitude"
        exact
        component={DisplayMatches}
      />
      <ProtectedRoute
        path="/Matches/:userID&:srcLat&:srcLng&:dstLat&:dstLng"
        exact
        component={DisplayMatches}
      />
      <ProtectedRoute
        path="/MyMatches/:userID"
        exact
        component={DisplayMyMatches}
      />
    </Switch>
  );
};

export default MatchManagementApp;
