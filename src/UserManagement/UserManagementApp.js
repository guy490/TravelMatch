import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { getUserCredentials } from "../utilities";

const UserManagementApp = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          const userCredentials = JSON.parse(getUserCredentials());
          if (userCredentials) {
            return <Redirect to={{ pathname: "/Category" }} />;
          } else {
            return <Login />;
          }
        }}
      />
      <Route path="/Register" exact component={Register} />
    </Switch>
  );
};

export default UserManagementApp;
