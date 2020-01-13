import React from "react";
import { Link } from "react-router-dom";

const ShowCategories = () => {
  return (
    <div className="ui">
      <Link to="/ShowPlaces/Restaurants" className="ui button">
        Restaurants
      </Link>
      <Link to="/ShowPlaces/Hang-Out" className="ui button">
        Hang-Out
      </Link>
      <Link to="/ShowPlaces/TouristAttractions" className="ui button">
        Tourist Attractions
      </Link>
    </div>
  );
};

export default ShowCategories;
