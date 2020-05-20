import React, { useEffect, useState } from "react";
import "./WaitingMessages.css";
import Modal from "react-modal";
import { socket } from "../../api";
import { Link } from "react-router-dom";

const WaitingMessages = ({ closeModal, receiverName, ...props }) => {
  Modal.setAppElement("#root");
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    socket.emit("getConversationsByReceiver", JSON.stringify(receiverName));

    socket.on("receiveConversations", (receiverConversations) => {
      setConversations(JSON.parse(receiverConversations));
    });
    return () => {
      socket.off("receiveConversations");
    };
  }, [receiverName]);

  const createConversationList = () => {
    const conversationList = conversations.map((conversation, index) => {
      const lastMessage =
        conversation.messages[conversation.messages.length - 1];
      const lastMessageDate = new Date(lastMessage.date);

      const date =
        lastMessageDate.getDate() +
        "/" +
        (lastMessageDate.getMonth() + 1) +
        "/" +
        lastMessageDate.getFullYear() +
        " @ " +
        lastMessageDate.getHours() +
        ":" +
        lastMessageDate.getMinutes() +
        ":" +
        lastMessageDate.getSeconds();

      return (
        <Link
          to={{
            pathname: `/Chat/${lastMessage.senderID}&${lastMessage.senderName}`,
          }}
          className="event waiting-message"
          onClick={() => closeModal()}
          key={index}
        >
          <div className="content">
            {lastMessage.senderName === receiverName ? (
              <div className="summary">
                You sent a message to
                {"  "}
                <span className="ui blue image label">
                  {/* <img src="/images/avatar/small/veronika.jpg" /> */}
                  {lastMessage.receiverName}
                </span>
                <div className="date">{date}</div>
              </div>
            ) : (
              <div className="summary">
                <span className="ui blue image label">
                  {/* <img src="/images/avatar/small/veronika.jpg" /> */}
                  {lastMessage.senderName}
                </span>
                {"  "}
                sent you a message
                <div className="date">{date}</div>
              </div>
            )}

            <div className="extra text">{lastMessage.text}</div>
          </div>
        </Link>
      );
    });

    return (
      <div className="ui feed">
        {conversations.length === 0 ? null : conversationList}
      </div>
    );
  };
  return (
    <Modal {...props} className="modal">
      <div className="modal-div">{createConversationList()}</div>
    </Modal>
  );
};

export default WaitingMessages;
