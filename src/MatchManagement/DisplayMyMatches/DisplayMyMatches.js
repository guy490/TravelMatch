import "./DisplayMyMatches.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { server } from "../../api";
import { SegmentInline } from "semantic-ui-react";

const DisplayMyMatches = ({ match }) => {
  const [matchList, setMatchList] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await server.get("/get_my_matches", {
        params: match.params,
      });
      if (componentIsMounted.current) {
        setMatchList(response.data);
      }
    };
    fetchMatches();
  }, [match]);

  const deleteMatch = async (placeID) => {
    server
      .post("/delete_match_request", {
        ...match.params,
        placeID,
      })
      .then(function (response) {
        let index = matchList.findIndex((place) => place.place_id === placeID);
        setMatchList([
          ...matchList.slice(0, index),
          ...matchList.slice(index + 1, matchList.length),
        ]);
        alert("Deletion Successful");
      })
      .catch((error) => {
        console.log(error);
        alert("Deletion failed");
      });
  };

  const renderMatches = () => {
    if (matchList.length === 0) {
      return;
    }
    return matchList.map((place) => {
      return (
        <div
          key={place.place_id}
          style={{ display: SegmentInline }}
          className="item"
        >
          {/* <img
            alt=" "
            className="ui avatar image profile-image"
            src="https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
          /> */}
          <div className="content">
            <a href=" " className="header">
              {`${place.name}`}
            </a>
          </div>
          <div className="buttons-div">
            <button
              onClick={() => deleteMatch(place.place_id)}
              className="ui button red match-buttons"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return <div className="ui celled list">{renderMatches()}</div>;
};

const mapStateToProps = (state) => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMyMatches);
