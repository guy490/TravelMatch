import React from "react";
import { Link, useHistory } from "react-router-dom";
import { server, socket } from "../../api";
import {
  createDictionaryForm,
  setUserCredentialsInLocalStorage,
} from "../../utilities";
import { connect } from "react-redux";
import { signIn } from "../../Redux/Actions";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

const Login = ({ signIn }) => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    server
      .post("/login_request", formData)
      .then(function (response) {
        const userCredentials = response.data;
        setUserCredentialsInLocalStorage(userCredentials);
        socket.emit("updateClientList", userCredentials._id);

        signIn(userCredentials);
        console.log(response);
        alert("Login Successful");
        history.push("/Category");
      })
      .catch((error) => {
        alert(error.request.responseText);
      });
  };

  const createForm = () => {
    return (
      <div className="login-containter">
        <div className="login-wrap">
          <form className="login-validate" onSubmit={submitForm}>
            <span className="login-title">Login to Travel Match</span>

            <div className="wrap-input validate-input">
              <span className="label-input">Username</span>

              <div className="focus-input">
                <PermIdentityIcon className="icons" />
                <input
                  type="text"
                  name="username"
                  placeholder="Type your ugit sername"
                  className="my-input"
                />
              </div>
            </div>
            <div className="wrap-input validate-input">
              <span className="label-input">Password</span>

              <div className="focus-input">
                <HttpsOutlinedIcon className="icons" />
                <input
                  type="password"
                  name="password"
                  placeholder="Type your password"
                  className="my-input"
                />
              </div>
            </div>

            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button className="login-form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
            <div className="text">OR</div>
            <Link to="/Register">
              <div className="container-login-form-btn">
                <div className="wrap-login-form-btn">
                  <div className="login-form-bgbtn"></div>
                  <button className="login-form-btn" type="submit">
                    SIGN UP
                  </button>
                </div>
              </div>
            </Link>
          </form>
        </div>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default connect(null, { signIn })(Login);
