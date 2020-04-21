import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Generals/ProtectedRoute";
import DisplayProfile from "./DisplayProfile/DisplayProfile";
import EditMyProfile from "./EditMyProfile/EditMyProfile";

const ProfileManagementApp = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/Profile/:userID"
        exact
        component={DisplayProfile}
      />
      <ProtectedRoute path="/Edit/:userID" exact component={EditMyProfile} />
    </Switch>
  );
};

export default ProfileManagementApp;
