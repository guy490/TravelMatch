import "../styles/Chat.css";
import React, { useEffect, useState } from "react";
import { socket } from "../../api";
import Comment from "./Comment";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (messages) => {
      setMessages(JSON.parse(messages));
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    let scrollingElement = document.querySelector(".comments");
    if (scrollingElement !== null) {
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
  };

  const renderComments = () => {
    return messages.map((message, index) => {
      if (typeof message === "string") {
        return (
          <Comment key={index} name={""} date={new Date()} text={message} />
        );
      }
      return (
        <Comment
          key={index}
          name={message.senderName}
          date={new Date(message.date)}
          text={message.text}
          image={message.image}
        />
      );
    });
  };

  return (
    <div className="ui comments segment container">{renderComments()}</div>
  );
};

export default Chat;
