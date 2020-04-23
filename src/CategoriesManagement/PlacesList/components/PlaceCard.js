import "../styles/PlaceCard.css";
import React, { useState, useEffect, useRef } from "react";
import { Rating } from "semantic-ui-react";
import { server, socket } from "../../../api";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PlaceCard = ({ place, userCredentials, location }) => {
  const [imageLink, setImageLink] = useState("");
  const [matchUserDetails, setmatchUserDetails] = useState({
    userID: null,
    placeID: null,
    latitude: null,
    longitude: null,
  });
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getPhoto(place);
  }, [place]);

  useEffect(() => {
    setmatchUserDetails({
      userID: userCredentials._id,
      placeID: place.place_id,
      ...location,
    });
  }, [userCredentials, place, location]);

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

  const findMatches = () => {
    server
      .post("/match_request", matchUserDetails)
      .then(function (response) {
        socket.emit("newMatchInserted");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        <Link
          to={{
            pathname: `/Matches/${matchUserDetails.userID}&${matchUserDetails.placeID}&${matchUserDetails.latitude}&${matchUserDetails.longitude}`,
          }}
        >
          <button className="ui button green" onClick={findMatches}>
            Find Match
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userCredentials: state.profileReducer,
    location: state.locationReducer,
  };
};

export default connect(mapStateToProps)(PlaceCard);
