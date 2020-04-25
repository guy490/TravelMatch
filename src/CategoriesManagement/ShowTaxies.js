import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { updateLocation } from "../Redux/Actions";

const ShowTaxies = ({ google, updateLocation, location }) => {
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

  return (
    <Map
      google={google}
      initialCenter={{
        lat: location.latitude || 40.854885,
        lng: location.longitude || -88.081807,
      }}
      zoom={14}>
      <Marker /*onClick={this.onMarkerClick}*/ name={"Current location"} />

      <InfoWindow /*onClose={onInfoWindowClose}*/></InfoWindow>
    </Map>
  );
};

const mapStateToProps = (state) => {
  return { location: state.locationReducer };
};

export default connect(mapStateToProps, { updateLocation })(
  GoogleApiWrapper({
    apiKey: process.env.TravelMatchAPIKey,
  })(ShowTaxies)
);
