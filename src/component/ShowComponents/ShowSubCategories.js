import "../../styles/ShowStyles/ShowSubCategories.css";
import React from "react";
import { Link } from "react-router-dom";

const ShowSubCategories = ({ match }) => {
  const getType = category => {
    switch (category) {
      case "Restaurants":
        return ["restaurant", "cafe"];
      case "Hang-Out":
        return ["bar", "night_club", "movie_theater", "casino"];
      case "TouristAttractions":
        return ["tourist_attraction", "aquarium", "museum", "park"];
      default:
        return null;
    }
  };
  const createButtonName = name => {
    let splittedName = name.split("_");
    let newName = splittedName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return newName;
  };
  const renderCategories = () => {
    let categoryList = getType(match.params.category);
    return categoryList.map(subCategory => (
      <Link
        key={subCategory}
        // className="ui button"
        className="SubCategoryLink"
        to={`${match.params.category}/${subCategory}`}>
        {/* {createButtonName(subCategory)} */}
        <div className="subCategory">
          <img
            className="icon"
            alt=""
            src="https://image.flaticon.com/icons/svg/608/608857.svg"></img>
          <span className="title">{createButtonName(subCategory)}</span>
        </div>
      </Link>
    ));
  };
  return <div className="ui">{renderCategories()}</div>;
};

export default ShowSubCategories;
