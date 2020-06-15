import "../styles/TextArea.css";
import React, { useEffect } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";

const TextArea = ({ destinationUserID, destinationUsername, userProfile }) => {
  useEffect(() => {
    const participants = {
      senderName: userProfile.username,
      receiverName: destinationUsername,
    };
    socket.emit("getMessages", JSON.stringify(participants));
  }, [userProfile, destinationUsername]);

  const onSubmit = (event) => {
    if (event.key === "Enter") {
      const message = {
        senderID: userProfile.userID,
        senderName: userProfile.username,
        receiverID: destinationUserID,
        receiverName: destinationUsername,
        date: new Date(),
        text: event.target.value,
        image: userProfile.profile_image,
      };
      event.target.value = "";
      socket.emit("sendMessage", JSON.stringify(message));
    }
  };
  const onSend = () => {};

  return (
    <div>
      <div className="ui container fluid focus input">
        <input
          type="text"
          placeholder="Chat"
          className="input-sizing"
          onKeyPress={onSubmit}
        />
      </div>
      <button
        className="ui grey button"
        style={{ marginTop: "15px" }}
        onClick={onSend}>
        <i className="reply icon"></i>
        Send
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userProfile: state.profileReducer };
};
export default connect(mapStateToProps)(TextArea);
