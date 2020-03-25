import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { server, socket } from "../../api";
import { useHistory } from "react-router-dom";
import { createDictionaryForm } from "../utilities";
import { connect } from "react-redux";
import { signIn } from "../../Actions";

const Login = ({ signIn }) => {
  let history = useHistory();

  useEffect(() => {
    socket.emit("connection", { name: "Guy" });
  }, []);

  const submitForm = async event => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    server
      .post("/login_request", formData)
      .then(function(response) {
        const username = JSON.parse(response.config.data).username;

        localStorage.setItem("Username", username);
        signIn({ username });

        alert("Login sucessful");
        history.push("/Category");
      })
      .catch(error => {
        console.log(error);
        alert("username or password are incorrect");
      });
  };

  const createForm = () => {
    return (
      <div>
        <form className="ui form" onSubmit={submitForm}>
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
          <Link to="/Register">
            <button className="ui button">Register</button>
          </Link>
        </form>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default connect(null, { signIn })(Login);
