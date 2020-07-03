import "../styles/TextArea.css";
import React, { useEffect, useState, useMemo } from "react";
import { socket } from "../../api";
import { connect } from "react-redux";

const TextArea = ({ destinationUserID, destinationUsername, userProfile }) => {
  const [textMessage, setTextMessage] = useState("");
  const participants = useMemo(() => {
    return {
      senderName: userProfile.username,
      receiverName: destinationUsername,
    };
  }, [userProfile, destinationUsername]);

  useEffect(() => {
    socket.emit("getMessages", JSON.stringify(participants));
  }, [participants]);

  const onSubmit = (event) => {
    if (event.key === "Enter" && textMessage !== "") {
      const message = {
        senderID: userProfile.userID || userProfile._id,
        senderName: userProfile.username,
        receiverID: destinationUserID,
        receiverName: destinationUsername,
        date: new Date(),
        text: textMessage,
        image: userProfile.profile_image,
      };
      setTextMessage("");
      socket.emit("sendMessage", JSON.stringify(message));
    }
  };
  const onSend = () => {
    if (textMessage !== "") {
      const message = {
        senderID: userProfile.userID || userProfile._id,
        senderName: userProfile.username,
        receiverID: destinationUserID,
        receiverName: destinationUsername,
        date: new Date(),
        text: textMessage,
        image: userProfile.profile_image,
      };
      setTextMessage("");
      socket.emit("sendMessage", JSON.stringify(message));
    }
  };

  return (
    <div>
      <div className="ui container fluid focus input">
        <input
          type="text"
          placeholder="Chat"
          className="input-sizing"
          onKeyPress={onSubmit}
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        />
      </div>
      <button
        className="ui grey button"
        style={{ marginTop: "15px" }}
        onClick={onSend}
      >
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
