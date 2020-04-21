import React, { useState, useEffect } from "react";
const countries = require("./countries.json");

const CreateInfoForm = ({ submitForm, userData, passwordField }) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCountry, setUserCountry] = useState(countries[106].name);
  const [userUsername, setUserUsername] = useState("");
  const [submitButtonName, setSubmitButtonName] = useState("Register");

  useEffect(() => {
    if (userData !== undefined) {
      setUserFirstName(userData.firstname);
      setUserLastName(userData.lastname);
      setUserAge(userData.age);
      setUserCountry(userData.country);
      setUserUsername(userData.username);
      setSubmitButtonName("Save");
    }
  }, [userData]);

  const generateCountries = () => {
    return countries.map((country) => {
      return (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      );
    });
  };

  const createForm = () => {
    return (
      <div>
        <form className="ui form" onSubmit={submitForm} action="/Login">
          <div className="field">
            <label>First name</label>
            <input
              value={userFirstName}
              onChange={(event) => setUserFirstName(event.target.value)}
              type="text"
              name="firstname"
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <label>Last name</label>
            <input
              value={userLastName}
              onChange={(event) => setUserLastName(event.target.value)}
              type="text"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <label>Age</label>
            <input
              value={userAge}
              onChange={(event) => setUserAge(event.target.value)}
              type="number"
              name="age"
              placeholder="Age"
            />
          </div>
          <div className="field">
            <label>Country</label>
            <select
              name="country"
              value={userCountry}
              onChange={(event) => setUserCountry(event.target.value)}
            >
              {generateCountries()}
            </select>
          </div>
          <div className="field">
            <label>Username</label>
            <input
              value={userUsername}
              onChange={(event) => setUserUsername(event.target.value)}
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          {passwordField !== undefined ? passwordField() : ""}
          <button className="ui button" type="submit">
            {submitButtonName}
          </button>
        </form>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default CreateInfoForm;
