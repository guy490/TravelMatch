import "../styles/MessageArea.css";
import React from "react";
import Chat from "./Chat";

const MessageArea = () => {
  return (
    <div className="ui top-view">
      <div className="chat-view">
        <Chat />
      </div>
    </div>
  );
};

export default MessageArea;
