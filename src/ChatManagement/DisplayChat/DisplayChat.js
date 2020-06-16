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
            <span style={{ fontWeight: "bold" }}>
              Conversation with {match.params.username}
            </span>
            <MessageArea />
          </div>
          <div className="ui divider"></div>
          <div className="buttom-view">
            <div className="text-area">
              <TextArea
                destinationUserID={match.params.userID}
                destinationUsername={match.params.username}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayChat;
