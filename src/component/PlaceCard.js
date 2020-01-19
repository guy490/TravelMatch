import "../styles/PlaceCard.css";
import React, { useState, useEffect } from "react";
import { Rating } from "semantic-ui-react";
import server from "../api";

const PlaceCard = ({ place }) => {
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    getPhoto(place);
  }, [place]);
  const getPhoto = async place => {
    if (place.hasOwnProperty("photos")) {
      let photoReference = place.photos[0].photo_reference;
      let response = await server.get(`/${photoReference}`);
      setImageLink(response.data);
      return;
    }
    setImageLink(
      "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
    );
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
        <img className="image-item" alt="Place" src={imageLink} />
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
