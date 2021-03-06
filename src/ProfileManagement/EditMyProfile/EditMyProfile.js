import React from "react";
import CreateInfoForm from "../../Generals/CreateInfoForm";
import { server } from "../../api";
import { useHistory } from "react-router-dom";
import {
  createDictionaryForm,
  setUserCredentialsInLocalStorage,
} from "../../utilities";
import { connect } from "react-redux";

const EditMyProfile = ({ currentUserProfile }) => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData;
    try {
      formData = await createDictionaryForm(event);
    } catch (error) {
      alert(error);
      return;
    }
    if (formData.profile_image instanceof Error) {
      delete formData["profile_image"];
    }
    formData.userID = currentUserProfile._id;

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
