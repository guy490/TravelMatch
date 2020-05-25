import "../styles/Comment.css";
import React from "react";

const Comment = (props) => {
  const date =
    props.date.getDate() +
    "/" +
    (props.date.getMonth() + 1) +
    "/" +
    props.date.getFullYear() +
    " @ " +
    props.date.getHours() +
    ":" +
    props.date.getMinutes() +
    ":" +
    props.date.getSeconds();

  const renderAvatar = () => {
    if (props.image === "") {
      return null;
    }
    return (
      <div className="avatar">
        <img
          src={props.image}
          alt=""
          style={{ borderRadius: "50%", width: "30px", height: "30px" }}
        />
      </div>
    );
  };
  return (
    <div className="comment">
      <div className="content">
        {renderAvatar()}
        <a className="author" href="www.walla.com">
          {props.name}
        </a>
        <div className="metadata">
          <div>{date}</div>
        </div>
        <div className="text">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
