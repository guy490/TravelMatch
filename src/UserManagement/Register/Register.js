import React from "react";
import CreateInfoForm from "../../Generals/CreateInfoForm";
import { server } from "../../api";
import { useHistory } from "react-router-dom";
import { createDictionaryForm } from "../../utilities";
import "../style/loginAndRegister.css";

const Register = () => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = {};
    try {
      formData = await createDictionaryForm(event);
      if (formData.profile_image instanceof Error) {
        alert(formData.profile_image);
        return;
      }
    } catch (error) {
      alert(error);
      return;
    }

    server
      .post("/register_request", formData)
      .then(function (response) {
        console.log(response);
        history.push("/");
      })
      .catch(function (error) {
        alert(error.request.responseText);
      });
  };
  const passwordField = () => (
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
  );
  return (
    <CreateInfoForm submitForm={submitForm} passwordField={passwordField} />
  );
};

export default Register;
