import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../Generals/ProtectedRoute";
import DisplayChat from "./DisplayChat/DisplayChat";

const ChatManagementApp = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/Chat/:userID&:username"
        exact
        component={DisplayChat}
      />
    </Switch>
  );
};

export default ChatManagementApp;
