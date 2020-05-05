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

  const submitForm = (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);

    formData.userID = currentUserProfile._id;
    server
      .post("/update_request", formData)
      .then(function (response) {
        setUserCredentialsInLocalStorage(formData);
        console.log(response);
        history.push("/");
      })
      .catch(function (error) {
        alert(error.request.responseText);
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
