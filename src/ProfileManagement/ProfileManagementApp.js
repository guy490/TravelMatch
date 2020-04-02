import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Generals/ProtectedRoute";
import DisplayProfile from "./DisplayProfile/DisplayProfile";

const ProfileManagementApp = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/Profile/:userID"
        exact
        component={DisplayProfile}
      />
    </Switch>
  );
};

export default ProfileManagementApp;
