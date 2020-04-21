import React from "react";
import CreateInfoForm from "../../Generals/CreateInfoForm";
import { server } from "../../api";
import { useHistory } from "react-router-dom";
import { createDictionaryForm } from "../../utilities";
import { connect } from "react-redux";

const EditMyProfile = ({ currentUserProfile }) => {
  let history = useHistory();

  const submitForm = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    server
      .post("/update_request", formData)
      .then(function (response) {
        console.log(response);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
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
