import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserCredentials } from "../utilities";
import { connect } from "react-redux";
import { signIn } from "../Actions";

const ProtectedRoute = ({ signIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const userCredentials = JSON.parse(getUserCredentials());
        if (userCredentials) {
          signIn(userCredentials);
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};

export default connect(null, { signIn })(ProtectedRoute);
