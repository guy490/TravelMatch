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
        senderID: userProfile._id,
        senderName: userProfile.username,
        receiverID: destinationUserID,
        receiverName: destinationUsername,
        date: new Date(),
        text: event.target.value,
        image:
          "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png",
      };
      event.target.value = "";
      socket.emit("sendMessage", JSON.stringify(message));
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
