import React from "react";
import { Link } from "react-router-dom";

const SubCategory = ({
  category,
  subCategoryName,
  subCategoryIcon,
  subCategoryColor
}) => {
  const createButtonName = name => {
    let splittedName = name.split("_");
    let newName = splittedName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return newName;
  };
  return (
    <div className="sub-category">
      <Link to={`${category}/${subCategoryName}`}>
        <div className="category-set">
          <img className="icon-view" alt="" src={subCategoryIcon}></img>
          <div className="title" style={{ color: `${subCategoryColor}` }}>
            {createButtonName(subCategoryName)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubCategory;
