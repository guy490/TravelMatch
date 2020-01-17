import "../styles/Category.css";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ linkTo, content, background, color }) => {
  return (
    <Link to={linkTo}>
      <div className="link">
        <div
          className="background"
          style={{
            //background: `${background}`,
            background: `linear-gradient(${color}),${background}`,
            backgroundSize: "100% 100%"
          }}></div>
        <div className="text">{content}</div>
      </div>
    </Link>
  );
};
export default Category;
