import "../styles/Category.css";
import React from "react";
import { Link } from "react-router-dom";

const Category = ({ linkTo, content }) => {
  return (
    <Link to={linkTo} className="ui button">
      {content}
    </Link>
  );
};
export default Category;
