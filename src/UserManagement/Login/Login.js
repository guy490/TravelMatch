import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const createForm = () => {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button className="ui button" type="submit">
            Login
          </button>
          <Link to="/Register">Register</Link>
        </form>
      </div>
    );
  };
  return <div>{createForm()}</div>;
};

export default Login;
