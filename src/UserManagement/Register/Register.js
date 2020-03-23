import React, { useState } from "react";
import server from "../../api";
import { useHistory } from "react-router-dom";
import { createDictionaryForm } from "../utilities";
const countries = require("./countries.json");

const Register = props => {
  let history = useHistory();
  const [country, setCountry] = useState(countries[106].name);

  const generateCountries = () => {
    return countries.map(country => {
      return (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      );
    });
  };

  const submitForm = async event => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    server
      .post("/register_request", formData)
      .then(function(response) {
        console.log(response);
        history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const createForm = () => {
    return (
      <div>
        <form className="ui form" onSubmit={submitForm} action="/Login">
          <div className="field">
            <label>First name</label>
            <input type="text" name="firstname" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Last name</label>
            <input type="text" name="lastname" placeholder="Last Name" />
          </div>
          <div className="field">
            <label>Age</label>
            <input type="number" name="age" placeholder="Age" />
          </div>

          <div className="field">
            <label>Country</label>
            <select name="country" value={country} onChange={setCountry}>
              {generateCountries()}
            </select>
          </div>
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" placeholder="Uservame" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button className="ui button" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default Register;
