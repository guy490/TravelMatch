import "../../styles/ShowStyles/ShowCategories.css";
import React from "react";
import Category from "../Category";

const ShowCategories = () => {
  return (
    <div /*className="ui"*/>
      <Category linkTo="/ShowPlaces/Restaurants" content="Restaurants" />
      <Category linkTo="/ShowPlaces/Hang-Out" content="Hang-Out" />
      <Category
        linkTo="/ShowPlaces/TouristAttractions"
        content="Tourist Attractions"
      />
    </div>
  );
};

export default ShowCategories;
