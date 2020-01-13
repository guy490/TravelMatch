import React from "react";
import { Rating } from "semantic-ui-react";
import server from "../api";

const PlaceCard = ({ place }) => {
  const getPhoto = async place => {
    if (place.hasOwnProperty("photos")) {
      let photoReference = place.photos[0].photo_reference;
      let response = await server.get(`/${photoReference}`);
      console.log(response.data);
      return response.data;
    }
    return null;
  };

  const checkOpennings = place => {
    let placeStatus = {};
    if (place.hasOwnProperty("opening_hours")) {
      placeStatus = place.opening_hours.open_now
        ? { status: "Open", color: "green" }
        : { status: "Closed", color: "red" };
    } else {
      return null;
    }
    return (
      <div className={`ui horizontal ${placeStatus.color} label`}>
        {placeStatus.status}
      </div>
    );
  };
  return (
    <div className="item">
      <div className="image">
        <img alt="" src={getPhoto(place)}></img>
      </div>
      <div className="content">
        <div className="header">{place.name}</div>
        <div className="meta">
          <span className="cinema">{place.vicinity}</span>
        </div>
        <div className="extra">
          {checkOpennings(place)}
          <div className="ui label">
            {place.rating}
            <Rating
              icon="star"
              rating={`${place.rating}`}
              maxRating={5}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
