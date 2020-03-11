import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

const UserManagementApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default UserManagementApp;
