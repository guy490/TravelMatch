import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { updateLocation } from "../Redux/Actions";

const ShowTaxies = ({ updateLocation, location }) => {
  const bounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ];

  const [sourceMarker, setSourceMarker] = useState({ lat: 0, lng: 0 });
  const [destinationMarker, setDestinationMarker] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    setSourceMarker({
      lat: location.latitude || 0,
      lng: location.longitude || 0,
    });
  }, [location]);

  useEffect(() => {
    const getCurrentLocationOfUser = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        updateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    };
    getCurrentLocationOfUser();
  }, [updateLocation]);

  const openPopup = (marker) => {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup();
      });
    }
  };

  const createMarker = (lat, lng, textContent) => {
    return (
      <Marker
        position={[lat, lng]}
        draggable={true}
        onDragEnd={changeSourceLocation}
        ref={openPopup}>
        <Popup>{textContent}</Popup>
      </Marker>
    );
  };

  const addDestinationMarker = (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setDestinationMarker({ lat, lng });
  };
  const changeSourceLocation = (e) => {
    const lat = e.target._latlng.lat;
    const lng = e.target._latlng.lng;
    setSourceMarker({ lat, lng });
  };

  return (
    <Map
      onclick={addDestinationMarker}
      bounds={bounds}
      viewport={{
        center: [sourceMarker.lat, sourceMarker.lng],
        zoom: 14,
      }}
      style={{ width: "100%", height: "600px" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {createMarker(sourceMarker.lat, sourceMarker.lng, "Source")}
      {destinationMarker.lat !== null && destinationMarker.lng !== null
        ? createMarker(
            destinationMarker.lat,
            destinationMarker.lng,
            "Destination"
          )
        : null}
    </Map>
  );
};

const mapStateToProps = (state) => {
  return { location: state.locationReducer };
};

export default connect(mapStateToProps, { updateLocation })(ShowTaxies);
