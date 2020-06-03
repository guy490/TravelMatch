import React from "react";
import { Link, useHistory } from "react-router-dom";
import { server, socket } from "../../api";
import {
  createDictionaryForm,
  setUserCredentialsInLocalStorage,
} from "../../utilities";
import { connect } from "react-redux";
import { signIn } from "../../Redux/Actions";

const Login = ({ signIn }) => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = await createDictionaryForm(event);
    console.log(formData);
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
      <div className="login-register-containter">
        <div className="login-register-wrap">
          <form className="login-register-validate" onSubmit={submitForm}>
            <span className="login-register-title">Login to Travel Match</span>
            <div className="wrap-input validate-input">
              <span className="label-input">Username</span>
              <div className="focus-input">
                <i className="user outline icon icons"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Type your username"
                  className="my-input"
                />
              </div>
            </div>
            <div className="wrap-input validate-input">
              <span className="label-input">Password</span>
              <div className="focus-input">
                <i className="lock icon icons"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Type your password"
                  className="my-input"
                />
              </div>
            </div>
            <div className="container-form-btn">
              <div className="wrap-form-btn">
                <div className="form-bgbtn"></div>
                <button className="form-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
            <div className="text">OR</div>
            <Link to="/Register">
              <div className="container-form-btn">
                <div className="wrap-form-btn">
                  <div className="form-bgbtn"></div>
                  <button className="form-btn" type="submit">
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
