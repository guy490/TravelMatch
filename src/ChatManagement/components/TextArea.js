import "../styles/TextArea.css";
import React from "react";
import { socket } from "../../api";
import { connect } from "react-redux";

const TextArea = ({ userProfile }) => {
  const sendMessage = (message) => {};
  const onSubmit = (event) => {
    if (event.key === "Enter") {
      const message = {
        senderName: userProfile.username,
        date: new Date(),
        text: event.target.value,
        image:
          "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png",
      };
      event.target.value = "";
      sendMessage(message);
    }
  };

  return (
    <div className="ui container fluid focus input">
      <input
        type="text"
        placeholder="Chat"
        className="input-sizing"
        onKeyPress={onSubmit}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userProfile: state.profileReducer };
};
export default connect(mapStateToProps)(TextArea);
