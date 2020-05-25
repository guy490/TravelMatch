import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";
const countries = require("./countries.json");

const CreateInfoForm = ({ submitForm, userData, passwordField }) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCountry, setUserCountry] = useState(countries[106].name);
  const [userUsername, setUserUsername] = useState("");
  const [submitButtonName, setSubmitButtonName] = useState("Register");
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (userData !== undefined) {
      setUserFirstName(userData.firstname);
      setUserLastName(userData.lastname);
      setUserAge(userData.age);
      setUserCountry(userData.country);
      setUserUsername(userData.username);
      setSubmitButtonName("Save");
      axios({
        url: userData.profile_image,
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        const blob = res.data;
        var file = new File([blob], "imageuploaded");

        setImgFile(file);
      });
    }
  }, [userData]);

  const onDrop = (picture) => {
    setImgFile(picture[0]);
  };

  const getURL = (imgFile) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(imgFile);
    return imageUrl;
  };

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
          <div className="field">
            {imgFile !== null ? (
              <img
                alt="Media Content"
                height="200px"
                width="200px"
                src={getURL(imgFile)}
              ></img>
            ) : null}
            <ImageUploader
              name="profile_image"
              withIcon={false}
              buttonText="Choose images"
              onChange={onDrop}
              singleImage={true}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
          </div>
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
