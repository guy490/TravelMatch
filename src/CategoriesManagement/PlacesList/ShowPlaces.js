import "./styles/ShowPlaces.css";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PlaceCard from "./components/PlaceCard";
import { server } from "../../api";
import { updateLocation } from "../../Redux/Actions";

const ShowPlaces = ({ match, updateLocation, location }) => {
  const [listOfPlaces, setListOfPlaces] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);
  useEffect(() => {
    const getCurrentLocationOfUser = () => {
      navigator.geolocation.getCurrentPosition(position => {
        updateLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    };
    getCurrentLocationOfUser();
  }, [updateLocation]);
  useEffect(() => {
    let type = match.params.subCategory;
    getQuery(location, type);
  }, [location, match]);

  const getQuery = async ({ latitude, longitude }, type) => {
    const response = await server.get("/", {
      params: {
        latitude,
        longitude,
        type
      }
    });
    let sortedData = response.data.sort(
      (placeA, placeB) => parseFloat(placeB.rating) - parseFloat(placeA.rating)
    );

    let finalList = sortedData.filter(place => place.hasOwnProperty("rating"));
    if (componentIsMounted.current) {
      setListOfPlaces(finalList);
    }
  };

  const renderList = placesList => {
    return placesList.map(place => {
      return <PlaceCard key={place.id} place={place} />;
    });
  };

  return (
    <div className="ui container">
      <div className="ui divided items unstackable">
        {renderList(listOfPlaces)}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { location: state.locationReducer };
};

export default connect(mapStateToProps, { updateLocation })(ShowPlaces);
