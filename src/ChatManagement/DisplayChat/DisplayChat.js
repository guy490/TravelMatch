import "./DisplayChat.css";
import React from "react";
import MessageArea from "../components/MessageArea";
import TextArea from "../components/TextArea";

const DisplayChat = ({ match }) => {
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
              <TextArea destinationUserID={match.params.userID} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayChat;
