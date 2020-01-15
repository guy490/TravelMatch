import "../styles/Category.css";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ linkTo, content }) => {
  return (
    <Link to={linkTo}>
      <div className="link">
        <div
          className="background"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
          }}
        ></div>
        <div className="text">{content}</div>
      </div>
    </Link>
  );
};
export default Category;
