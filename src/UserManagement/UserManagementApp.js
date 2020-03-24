import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

const UserManagementApp = ({ signIn }) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          const username = localStorage.getItem("Username");
          if (username) {
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
