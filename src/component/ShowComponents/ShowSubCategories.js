import "../../styles/ShowStyles/ShowSubCategories.css";
import React from "react";
import SubCategory from "../SubCategory";
import { Link } from "react-router-dom";
import { getType } from "../utilities";

const ShowSubCategories = ({ match }) => {
  const renderCategories = () => {
    let categoryList = getType(match.params.category);
    return categoryList.map(subCategory => (
      <SubCategory
        key={subCategory.categoryName}
        category={match.params.category}
        subCategoryName={subCategory.categoryName}
        subCategoryIcon={subCategory.categoryIcon}
      />
    ));
  };
  return (
    <div className="background-cover">
      <Link to="/" className="ui labeled button basic">
        <div>
          <i className="arrow alternate circle left icon"></i>
          Back
        </div>
      </Link>
      {renderCategories()}
    </div>
  );
};

export default ShowSubCategories;
