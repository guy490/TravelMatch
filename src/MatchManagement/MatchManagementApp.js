import "./MatchManagementApp.css";
import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Generals/ProtectedRoute";
import DisplayMatches from "./DisplayMatches";

const MatchManagementApp = () => {
  return (
    <Switch>
      <ProtectedRoute path="/Matches" exact component={DisplayMatches} />
    </Switch>
  );
};

export default MatchManagementApp;
