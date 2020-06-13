import "./DisplayMyMatches.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { server, socket } from "../../api";
// import { SegmentInline } from "semantic-ui-react";
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
        alert("Deletion Successful");
        socket.emit("matchDeleted");
      })
      .catch((error) => {
        console.log(error);
        alert("Deletion failed");
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
            <span
              key={key}
              className="ui tag label"
              style={{ transform: "translate(-10px, 15px)" }}>
              {key}:{`${day}/${month}/${fullYear}`}
            </span>
          );
        } else {
          filters.push(
            <span
              key={key}
              className="ui tag label"
              style={{ transform: "translate(-10px, 15px)" }}>
              {key}: {placeObject[key]}
            </span>
          );
        }
    }
    console.log(filters);
    return <div className="ui">{filters}</div>;
  };
  const renderPlaceMatches = () => {
    if (placesMatchList.length === 0) {
      return;
    }

    return placesMatchList.map((place) => {
      return (
        <div
          className="ui clearing segment"
          key={place.place_id}
          style={{ margin: "10px" }}>
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
            //style={{ display: SegmentInline }}
            //className="ui clearing segment"
          >
            <div
              style={{
                transform: "translate(10px, 10px)",
              }}>{`${place.name}`}</div>
            <span>{renderFilters(place.attributes)}</span>

            {/* <img
            alt=" "
            className="ui avatar image profile-image"
            src="https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
          /> }
          <div className="content">
            <span className="header">{`${place.name}`}</span>
          </div>
          {renderFilters(place.attributes)}
          <div className="buttons-div">
            <button
              onClick={() => deleteMatch(place.place_id)}
              className="ui button red match-buttons">
              Delete
            </button>
          </div>*/}
          </Link>

          <button
            className="ui circular red icon right floated button"
            style={{ transform: "translate(10px, -15px)" }}
            onClick={() => deleteMatch(place.place_id)}>
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
        <Link
          to={{
            pathname: `/Matches/${match.params.userID}&${taxi.source.lat}&${taxi.source.lng}&${taxi.destination.lat}&${taxi.destination.lng}`,
          }}
          key={taxi._id}
          // style={{ display: SegmentInline }}
          className="item">
          <div className="content">
            <span className="header">Taxi Request from:</span>
            <div>
              Latitude: {taxi.source.lat.toFixed(2)}, Longitude:{" "}
              {taxi.source.lng.toFixed(2)}
            </div>
            <span className="header">To:</span>
            <div>
              Latitude: {taxi.destination.lat.toFixed(2)}, Longitude:{" "}
              {taxi.destination.lng.toFixed(2)}
            </div>
          </div>
          {/* <div className="buttons-div">
            <button
              onClick={() => deleteMatch(place.place_id)}
              className="ui button red match-buttons"
            >
              Delete
            </button>
          </div> */}
        </Link>
      );
    });
  };

  return (
    <div className="ui celled list">
      {renderPlaceMatches()}
      {renderTaxiMatches()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMyMatches);
