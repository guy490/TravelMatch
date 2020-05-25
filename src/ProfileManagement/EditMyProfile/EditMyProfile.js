import React from "react";
import CreateInfoForm from "../../Generals/CreateInfoForm";
import { server } from "../../api";
import { useHistory } from "react-router-dom";
import {
  createDictionaryForm,
  setUserCredentialsInLocalStorage,
  uploadProfileImage,
} from "../../utilities";
import { connect } from "react-redux";

const EditMyProfile = ({ currentUserProfile }) => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    formData.userID = currentUserProfile._id;

    try {
      formData.profile_image = await uploadProfileImage(event);
    } catch {
      delete formData["profile_image"];
    }
    server
      .post("/update_request", formData)
      .then(function (response) {
        setUserCredentialsInLocalStorage({
          ...currentUserProfile,
          ...formData,
        });
        console.log(response);
        history.push("/");
      })
      .catch(function (error) {
        if (error.request !== undefined) {
          alert(error.request.responseText);
        } else {
          alert(error);
        }
      });
  };

  return (
    <CreateInfoForm submitForm={submitForm} userData={currentUserProfile} />
  );
};

const mapStateToProps = (state) => {
  return { currentUserProfile: state.profileReducer };
};

export default connect(mapStateToProps)(EditMyProfile);
