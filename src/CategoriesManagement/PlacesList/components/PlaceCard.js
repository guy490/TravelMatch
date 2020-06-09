import "../styles/PlaceCard.css";
import React, { useState, useEffect, useRef } from "react";
import FilterModal from "../../../MatchManagement/FilterModal/FilterModal.js";
import { Rating } from "semantic-ui-react";
import { server } from "../../../api";

const PlaceCard = ({ place }) => {
  const [imageLink, setImageLink] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getPhoto(place);
  }, [place]);

  const getPhoto = async (place) => {
    if (place.hasOwnProperty("photos")) {
      let photoReference = place.photos[0].photo_reference;
      let response = await server.get(`/${photoReference}`);
      if (componentIsMounted.current) {
        setImageLink(response.data);
      }
      return;
    }
    setImageLink(
      "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
    );
  };

  const checkOpennings = (place) => {
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="item">
      <div className="image image-placecard">
        <img
          className="image-item image-item-placecard"
          alt="Place"
          src={imageLink}
        />
      </div>
      <div className="content">
        <div className="header">
          {place.name} {checkOpennings(place)}
        </div>
        <div className="meta">
          <span className="cinema">{place.vicinity}</span>
        </div>
        <div className="extra" style={{ marginBottom: "10px" }}>
          {place.rating}
          <Rating
            style={{ marginLeft: "2px" }}
            icon="star"
            rating={`${place.rating}`}
            maxRating={5}
            disabled
          />
        </div>
        <button
          className="ui basic button floated circular"
          onClick={openModal}>
          <i className="search icon"></i>
          Find Match
        </button>
      </div>
      <FilterModal
        placeID={place.place_id}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default PlaceCard;
