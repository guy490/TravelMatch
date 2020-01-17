import "../../styles/ShowStyles/ShowCategories.css";
import React from "react";
import Category from "../Category";

const ShowCategories = () => {
  return (
    <div /*className="ui"*/>
      <Category
        linkTo="/ShowPlaces/Restaurants"
        content="Restaurants"
        backgroundURL="url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        gradientColors="rgba(0, 150, 150, 0.5) 10%,rgba(0, 200, 255, 0.2) 90%"
      />
      <Category
        linkTo="/ShowPlaces/Hang-Out"
        content="Hang-Out"
        backgroundURL="url(https://images.unsplash.com/photo-1483821838526-8d9756a6e1ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1188&q=80)"
        gradientColors="rgba(0, 118, 255, 0.5) 10%,rgba(0, 50, 255, 0.2) 90%"
      />
      <Category
        linkTo="/ShowPlaces/TouristAttractions"
        content="Tourist Attractions"
        backgroundURL="url(https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80)"
        gradientColors="rgba(0, 0, 255, 0.5) 10%,rgba(0, 0, 200, 0.2) 90%"
      />
      <Category
        linkTo="/ShowPlaces/Events"
        content="Events"
        backgroundURL="url(https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)"
        gradientColors="rgba(198, 0, 255, 0.5) 10%,rgba(100, 0, 255, 0.2) 90%"
      />
      <Category
        linkTo="/ShowPlaces/Services"
        content="Services"
        backgroundURL="url(https://images.unsplash.com/photo-1488998628026-a1a79746cdcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        gradientColors="rgba(144, 0, 255, 0.5) 10%,rgba(100, 0, 255, 0.2) 90%"
      />
    </div>
  );
};

export default ShowCategories;