import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Map, TileLayer, Marker, Tooltip, Circle } from "react-leaflet";
import { updateLocation } from "../Redux/Actions";

const ShowTaxies = ({ updateLocation, location }) => {
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
      style={{ width: "100%", height: "600px" }}
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
    </Map>
  );
};

// (source2.x - source1.x)^2 + (source2.y - source1.y)^2 <= 500^2 && (destination2.x - destination1.x)^2 + (destination2.y - destination1.y)^2 <= 500^2

const mapStateToProps = (state) => {
  return { location: state.locationReducer };
};

export default connect(mapStateToProps, { updateLocation })(ShowTaxies);
