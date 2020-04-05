import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserCredentials } from "../utilities";
import { connect } from "react-redux";
import { signIn } from "../Redux/Actions";
import { socket } from "../api";

const ProtectedRoute = ({ signIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const userCredentials = JSON.parse(getUserCredentials());
        if (userCredentials) {
          socket.emit("updateClientList", userCredentials._id);
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
