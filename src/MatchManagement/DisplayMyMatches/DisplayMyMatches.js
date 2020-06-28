import "./DisplayMyMatches.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { server, socket } from "../../api";
import { Link } from "react-router-dom";

const DisplayMyMatches = ({ match }) => {
  const [placesMatchList, setPlacesMatchList] = useState([]);
  const [locationMatchList, setLocationMatchList] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      server
        .get("/get_my_matches", {
          params: match.params,
        })
        .then((response) => {
          if (componentIsMounted.current) {
            setPlacesMatchList(response.data.placeList);
            setLocationMatchList(response.data.taxiRequests);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchMatches();
  }, [match]);

  const deleteMatch = async (placeID) => {
    server
      .post("/delete_match_request", {
        ...match.params,
        placeID,
      })
      .then(() => {
        let index = placesMatchList.findIndex(
          (place) => place.place_id === placeID
        );
        setPlacesMatchList([
          ...placesMatchList.slice(0, index),
          ...placesMatchList.slice(index + 1, placesMatchList.length),
        ]);
        socket.emit("matchDeleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderFilters = (place) => {
    let placeObject = { ...place };
    let filters = [];
    delete placeObject["_id"];
    const keys = Object.keys(placeObject);
    placeObject["date"] = new Date(placeObject["date"]);

    for (const key of keys) {
      if (
        placeObject[key] !== "None" &&
        placeObject[key] !== 0 &&
        +placeObject[key] !== +new Date(null)
      )
        if (key === "date") {
          const day = placeObject[key].getDate();
          const month = placeObject[key].getMonth();
          const fullYear = placeObject[key].getFullYear();
          filters.push(
            <span key={key} className="ui label filter-label">
              <i className="calendar alternate outline icon"></i>
              {`${day}/${month}/${fullYear}`}
            </span>
          );
        } else if (key === "fromAge") {
          const fromAge = placeObject[key];
          filters.push(
            <span key={key} className="ui label filter-label">
              <i className="sort numeric down icon"></i>
              from {fromAge} years old
            </span>
          );
        } else if (key === "toAge") {
          const toAge = placeObject[key];
          filters.push(
            <span key={key} className="ui label filter-label">
              <i className="sort numeric down icon"></i>
              to {toAge} years old
            </span>
          );
        } else if (key === "country") {
          const country = placeObject[key];
          filters.push(
            <span key={key} className="ui label filter-label">
              <i className="globe icon"></i>
              {country}
            </span>
          );
        } else if (key === "gender") {
          const gender = placeObject[key];
          filters.push(
            <span key={key} className="ui label filter-label">
              <i className="venus mars icon"></i>
              {gender}
            </span>
          );
        }
    }
    return <div className="ui">{filters}</div>;
  };
  const renderPlaceMatches = () => {
    if (placesMatchList.length === 0) {
      return;
    }

    return placesMatchList.map((place) => {
      return (
        <div className="ui raised segment my-segment" key={place.place_id}>
          <Link
            to={{
              pathname: `/Matches/${match.params.userID}&${place.place_id}&${
                place.latitude
              }&${place.longitude}&${place.attributes.fromAge}&${
                place.attributes.toAge
              }&${place.attributes.gender}&${
                place.attributes.country
              }&${encodeURIComponent(place.attributes.date)}`,
            }}
            key={place.place_id}
          >
            <div className="header-link">{`${place.name}`} </div>
            <span>{renderFilters(place.attributes)}</span>
          </Link>

          <button
            className="ui circular red icon right floated button"
            style={{ transform: "translate(20%, -75%)" }}
            onClick={() => deleteMatch(place.place_id)}
          >
            <i className="trash alternate icon"></i>
          </button>
        </div>
      );
    });
  };

  const renderTaxiMatches = () => {
    if (locationMatchList.length === 0) {
      return;
    }

    return locationMatchList.map((taxi) => {
      return (
        <div className="ui raised segment my-segment" key={taxi._id}>
          <Link
            to={{
              pathname: `/Matches/${match.params.userID}&${taxi.source.lat}&${taxi.source.lng}&${taxi.destination.lat}&${taxi.destination.lng}`,
            }}
            key={taxi._id}
          >
            <div className="header-link">Texi Request </div>
            <div className="from-to-text">
              From
              <span className="ui label location-label">
                <i className="map marker alternate icon "></i>(
                {taxi.source.lat.toFixed(2)} , {taxi.source.lng.toFixed(2)})
              </span>
            </div>
            <div className="from-to-text">
              To
              <span className="ui label location-label">
                <i className="map marker alternate icon"></i>(
                {taxi.destination.lat.toFixed(2)} , {taxi.source.lng.toFixed(2)}
                )
              </span>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="ui celled list">
      <h3 className="page-title ui horizontal divider header">
        <i className="bookmark icon"></i>
        My Matches
      </h3>
      {renderPlaceMatches()}
      {renderTaxiMatches()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMyMatches);
