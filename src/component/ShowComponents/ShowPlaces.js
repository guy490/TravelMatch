import "../../styles/ShowStyles/ShowPlaces.css";
import React, { useState, useEffect } from "react";
import PlaceCard from "../PlaceCard";
import { Link } from "react-router-dom";
import server from "../../api";

const ShowPlaces = ({ match }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [listOfPlaces, setListOfPlaces] = useState([]);

  useEffect(() => {
    getCurrentLocationOfUser();
  }, []);
  useEffect(() => {
    let type = match.params.subCategory;
    getQuery(location, type);
  }, [location, match]);

  const getCurrentLocationOfUser = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

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
    setListOfPlaces(finalList);
  };

  const renderList = placesList => {
    return placesList.map(place => {
      return <PlaceCard key={place.id} place={place} />;
    });
  };

  return (
    <div className="ui container">
      <Link to="/" className="ui button">
        Back To Select Category
      </Link>
      <div className="ui divided items">{renderList(listOfPlaces)}</div>
    </div>
  );
};

export default ShowPlaces;
