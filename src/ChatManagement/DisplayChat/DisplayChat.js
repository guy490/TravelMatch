import "./DisplayChat.css";
import React, { useEffect } from "react";
import MessageArea from "../components/MessageArea";
import TextArea from "../components/TextArea";
import { socket } from "../../api";

const DisplayChat = () => {
  useEffect(() => () => socket.emit("disconnect"), []);

  return (
    <div className="ui container">
      <div className="ui chat">
        <div className="ui placeholder segment">
          <div className="head-view">
            <MessageArea />
          </div>
          <div className="ui divider"></div>
          <div className="buttom-view">
            <div className="text-area">
              <TextArea />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayChat;
