import "../../styles/ShowStyles/ShowCategories.css";
import React from "react";
import Category from "../Category";

const ShowCategories = () => {
  return (
    <div>
      <Category
        linkTo="/ShowPlaces/Restaurants"
        content="Restaurants"
        backgroundURL="url(https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        gradientColors="rgba(76, 246, 249,0.5) 99%,rgba(0, 149, 229 ,0.5) 1%"
      />
      <Category
        linkTo="/ShowPlaces/Hang-Out"
        content="Hang-Out"
        backgroundURL="url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)"
        gradientColors="rgba(26, 54, 239, 0.5) 99%,rgba(90, 47, 248,0.5) 1%"
      />
      <Category
        linkTo="/ShowPlaces/TouristAttractions"
        content="Tourist Attractions"
        backgroundURL="url(https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80)"
        gradientColors="rgba(170, 18, 190,0.5) 99%,rgba(248, 11, 46,0.5) 1%"
      />
      <Category
        linkTo="/ShowPlaces/Events"
        content="Events"
        backgroundURL="url(https://images.unsplash.com/photo-1460451330947-331de664bf35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)"
        gradientColors="rgba(229, 0, 61,0.5) 98%,rgba(229, 0, 61,0.5) 1%"
      />
      {/* <Category
        linkTo="/ShowPlaces/Services"
        content="Services"
        backgroundURL="url(https://images.unsplash.com/photo-1488998628026-a1a79746cdcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        gradientColors="rgba(144, 0, 255, 0.5) 10%,rgba(100, 0, 255, 0.2) 90%"
      /> */}
    </div>
  );
};

export default ShowCategories;
