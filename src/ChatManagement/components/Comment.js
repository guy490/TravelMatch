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
          style={{ borderRadius: "50%", width: "40px", height: "40px" }}
        />
      </div>
    );
  };
  return (
    <div className="ui segment" style={{ borderRadius: "40px" }}>
      <div className="comment">
        {renderAvatar()}
        <div className="content">
          <span className="author" href="">
            {props.name}
          </span>
          <div className="metadata">
            <div>{date}</div>
          </div>
          <div className="text">
            <p>{props.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
