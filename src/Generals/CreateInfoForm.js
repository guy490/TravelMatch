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
  const [aboutText, setAboutText] = useState("");
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
        setAboutText(userData.about);
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
        <div className="login-register-containter">
          <div className="login-register-wrap" style={{ overflowY: "scroll" }}>
            <div className="main-logo">
              <img className="main-logo-image" src="./text_logo.png" alt="" />
            </div>
            <form
              className="login-register-validate"
              onSubmit={submitForm}
              action="/Login">
              <span className="login-register-title">Sign Up</span>
              <div className="wrap-input validate-input">
                <span className="label-input">First Name</span>
                <div className="focus-input">
                  <i className="id badge outline icon icons"></i>
                  <input
                    value={userFirstName}
                    onChange={(event) => setUserFirstName(event.target.value)}
                    type="text"
                    name="firstname"
                    placeholder="Type your first name"
                    className="my-input"
                  />
                </div>
              </div>

              <div className="wrap-input validate-input">
                <span className="label-input">Last Name</span>
                <div className="focus-input">
                  <i className="id badge outline icon icons"></i>
                  <input
                    value={userLastName}
                    onChange={(event) => setUserLastName(event.target.value)}
                    type="text"
                    name="lastname"
                    placeholder="Type your last name"
                    className="my-input"
                  />
                </div>
              </div>
              <div className="wrap-input validate-input">
                <span className="label-input">Age</span>
                <div className="focus-input">
                  <i className="calendar alternate outline icon icons"></i>
                  <input
                    value={userAge}
                    onChange={(event) => setUserAge(event.target.value)}
                    type="number"
                    name="age"
                    placeholder="Type your age"
                    className="my-input"
                  />
                </div>
              </div>
              <div className="wrap-input validate-input">
                <span className="label-input">Country</span>
                <div className="focus-input">
                  <select
                    name="country"
                    value={userCountry}
                    className=" my-select"
                    onChange={(event) => setUserCountry(event.target.value)}>
                    {generateCountries()}
                  </select>
                </div>
              </div>
              <div className="wrap-input validate-input">
                <span className="label-input">Username</span>
                <div className="focus-input">
                  <i className="user outline icon icons"></i>
                  <input
                    value={userUsername}
                    onChange={(event) => setUserUsername(event.target.value)}
                    type="text"
                    name="username"
                    placeholder="Type your username"
                    className="my-input"
                  />
                </div>
              </div>
              {passwordField !== undefined ? passwordField() : ""}
              <div className=" validate-input">
                <span className="label-input">About</span>
                <div className="focus-input">
                  {/* <i className="calendar alternate outline icon icons"></i> */}
                  <textarea
                    value={aboutText}
                    onChange={(event) => setAboutText(event.target.value)}
                    name="about"
                    placeholder="Tell about yourself"
                    className="my-textarea" // <--- need to be filled with textarea class
                  />
                  <i className="comment outline icon textarea-icon"></i>
                </div>
              </div>
              <div className="label-input">Upload your image</div>
              {imgFile !== null ? (
                <img
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  alt="Media Content"
                  height="200px"
                  width="200px"
                  src={getURL(imgFile)}></img>
              ) : null}

              <ImageUploader
                name="profile_image"
                withIcon={false}
                buttonText="Choose images"
                onChange={onDrop}
                singleImage={true}
                imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
                maxFileSize={10242880}
              />
              <div
                className="container-form-btn"
                style={{ paddingBottom: "10px" }}>
                <div className="wrap-form-btn">
                  <div className="form-bgbtn"></div>
                  <button className="form-btn" type="submit">
                    {submitButtonName}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <div>{createForm()}</div>;
};

export default CreateInfoForm;
