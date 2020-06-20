import "../styles/Category.css";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ linkTo, content, backgroundURL, gradientColors }) => {
  const createCategoryStyle = (imageLink, gradientColors) => {
    return {
      backgroundImage: `linear-gradient(${gradientColors}),${imageLink}`,
      backgroundSize: "100% 100%",
    };
  };

  return (
    <Link to={linkTo}>
      <div className="link">
        <div
          className="background"
          style={createCategoryStyle(backgroundURL, gradientColors)}></div>
        <div className="text text-category">{content}</div>
      </div>
    </Link>
  );
};
export default Category;
