import React, { useEffect, useState, useCallback, useReducer } from "react";
import { connect } from "react-redux";
import { server, socket } from "../../api";
import { useHistory } from "react-router-dom";
import { Map, TileLayer } from "react-leaflet";
import { updateLocation } from "../../Redux/Actions";
import MarkerPoint from "./MarkerPoint/MarkerPoint";

const reducer = (state, action) => {
  switch (action.type) {
    case "Source":
      // console.log({ ...state, source: { ...action.payload } });
      return { ...state, source: { ...action.payload } };
    case "Destination":
      // console.log({ ...state, destination: { ...action.payload } });
      return { ...state, destination: { ...action.payload } };
    case "Both":
      // console.log({ ...action.payload });
      return { ...action.payload };
    default:
      return state;
  }
};

const ShowTaxies = ({ updateLocation, location, profile }) => {
  const bounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];
  let history = useHistory();
  const [{ source, destination }, dispatch] = useReducer(reducer, {
    source: { lat: 0, lng: 0 },
    destination: { lat: 0, lng: 0 },
  });
  const [selectedMarker, setSelectedMarker] = useState("");
  const getCurrentLocationOfUser = useCallback(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      updateLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    });
  }, [updateLocation]);

  useEffect(() => {
    const lat = location.latitude || 0;
    const lng = location.longitude || 0;
    const source = { lat, lng };
    const destination = { lat: lat + 0.005 || 0, lng: lng - 0.005 || 0 };
    dispatch({
      type: "Both",
      payload: { source, destination },
    });
  }, [location]);

  useEffect(() => {
    getCurrentLocationOfUser();
  }, [getCurrentLocationOfUser]);

  const findMatches = () => {
    const matchUserDetails = {
      userID: profile._id,
      source,
      destination,
    };
    server
      .post("/match_request", matchUserDetails)
      .then(function (response) {
        socket.emit("newMatchInserted");
        console.log(response);
        history.push(
          `/Matches/${profile._id}&${source.lat}&${source.lng}&${destination.lat}&${destination.lng}`
        );
      })
      .catch(function (error) {
        console.log(error.request.responseText);
      });
  };

  const chooseMarker = (textContent) => {
    setSelectedMarker(textContent);
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <Map
        animate={true}
        onclick={({ latlng }) => {
          const lat = latlng.lat;
          const lng = latlng.lng;
          dispatch({ type: selectedMarker, payload: { lat, lng } });
        }}
        bounds={bounds}
        viewport={{
          center: [source.lat, source.lng],
          zoom: 14,
        }}
        style={{
          width: "100%",
          height: "900px",
          zIndex: "10",
          position: "absolute",
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerPoint
          onClick={() => chooseMarker("Source")}
          position={[source.lat, source.lng]}
          toolTipTitle={`Source`}
        />
        <MarkerPoint
          onClick={() => chooseMarker("Destination")}
          position={[destination.lat, destination.lng]}
          toolTipTitle={`Destination`}
        />
      </Map>
      <button
        className="ui circular twitter button"
        onClick={(evt) => {
          findMatches();
          return;
        }}
        style={{
          position: "absolute",
          zIndex: "400",
          top: "20%",
          transform: "translate(40px, 20px)",
        }}
      >
        <i className="search icon"></i>
        Find Match
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { location: state.locationReducer, profile: state.profileReducer };
};

export default connect(mapStateToProps, { updateLocation })(ShowTaxies);
