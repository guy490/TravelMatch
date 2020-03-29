import "./styles/ShowSubCategories.css";
import React, { useEffect, useState } from "react";
import SubCategory from "./components/SubCategory";
import { Link } from "react-router-dom";
import { getType } from "../../utilities";

const ShowSubCategories = ({ match }) => {
  const [subCategoryDict, setSubCategoryDict] = useState({
    subCategoryList: [],
    subCategoryBackground: "",
    subCategoryColor: ""
  });

  useEffect(() => {
    setSubCategoryDict(getType(match.params.category));
  }, [match]);

  const renderCategories = () => {
    return subCategoryDict.subCategoryList.map(subCategory => (
      <SubCategory
        key={subCategory.categoryName}
        category={match.params.category}
        subCategoryName={subCategory.categoryName}
        subCategoryIcon={subCategory.categoryIcon}
        subCategoryColor={subCategoryDict.subCategoryColor}
      />
    ));
  };

  return (
    <div
      className="background-cover"
      style={{
        backgroundImage: `${subCategoryDict.subCategoryBackground}`
      }}>
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
