import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { server, socket } from "../api";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Tooltip, Circle } from "react-leaflet";
import { updateLocation } from "../Redux/Actions";

const ShowTaxies = ({ updateLocation, location, profile }) => {
  const bounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];
  const [selectedMarker, setSelectedMarker] = useState("");
  const [sourceMarker, setSourceMarker] = useState({ lat: 0, lng: 0 });
  const [destinationMarker, setDestinationMarker] = useState({
    lat: 0,
    lng: 0,
  });
  const getCurrentLocationOfUser = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      updateLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [updateLocation]);

  useEffect(() => {
    setSourceMarker({
      lat: location.latitude || 0,
      lng: location.longitude || 0,
    });
    setDestinationMarker({
      lat: location.latitude + 0.005 || 0,
      lng: location.longitude - 0.005 || 0,
    });
  }, [location]);

  useEffect(() => {
    getCurrentLocationOfUser();
  }, [getCurrentLocationOfUser]);

  const findMatches = () => {
    const matchUserDetails = {
      userID: profile._id,
      source: sourceMarker,
      destination: destinationMarker,
    };
    server
      .post("/match_request", matchUserDetails)
      .then(function (response) {
        socket.emit("newMatchInserted");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.request.responseText);
      });
  };

  const openTooltip = (marker) => {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openTooltip();
      });
    }
  };

  const testFunction = (textContent) => {
    setSelectedMarker(textContent);
  };

  const createMarker = (lat, lng, textContent) => {
    return (
      <Marker
        onClick={() => testFunction(textContent)}
        position={[lat, lng]}
        ref={openTooltip}
      >
        <Tooltip>{textContent}</Tooltip>
      </Marker>
    );
  };

  const changeMarkerPostion = (e, setStateLocation) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setStateLocation({ lat, lng });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Map
        animate={true}
        onclick={(e) =>
          changeMarkerPostion(
            e,
            selectedMarker === "Source" ? setSourceMarker : setDestinationMarker
          )
        }
        bounds={bounds}
        viewport={{
          center: [sourceMarker.lat, sourceMarker.lng],
          zoom: 14,
        }}
        style={{
          width: "100%",
          height: "900px",
          position: "relative ",
          zIndex: "10",
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[sourceMarker.lat, sourceMarker.lng]}
          fillColor="blue"
          radius={500}
        />
        <Circle
          center={[destinationMarker.lat, destinationMarker.lng]}
          fillColor="blue"
          radius={500}
        />
        {createMarker(sourceMarker.lat, sourceMarker.lng, "Source")}
        {createMarker(
          destinationMarker.lat,
          destinationMarker.lng,
          "Destination"
        )}
        <Link
          to={{
            pathname: `/Matches/${profile._id}&${sourceMarker.lat}&${sourceMarker.lng}&${destinationMarker.lat}&${destinationMarker.lng}`,
          }}
        >
          <button
            className="ui circular twitter button"
            onClick={findMatches}
            style={{
              position: "absolute",
              zIndex: "400",
              transform: "translate(40px, 20px)",
            }}
          >
            <i className="search icon"></i>
            Find Match
          </button>
        </Link>
      </Map>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { location: state.locationReducer, profile: state.profileReducer };
};

export default connect(mapStateToProps, { updateLocation })(ShowTaxies);
