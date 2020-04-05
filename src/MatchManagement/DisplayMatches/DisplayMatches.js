import "./DisplayMatches.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { server } from "../../api";
import { SegmentInline } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DisplayMatches = ({ match }) => {
  const [matchList, setMatchList] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await server.get("/get_matches", {
        params: match.params,
      });
      if (componentIsMounted.current) {
        setMatchList(response.data);
      }
    };
    fetchMatches();
  }, [match]);

  const renderMatches = () => {
    if (matchList.length === 0) {
      return;
    }
    return matchList.map((matchObject) => {
      if (matchObject._id === match.params.userID) {
        return null;
      }
      return (
        <div
          key={matchObject._id}
          style={{ display: SegmentInline }}
          className="item"
        >
          <img
            alt=" "
            className="ui avatar image profile-image"
            src="https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
          />
          <div className="content">
            <a href=" " className="header">
              {`${matchObject.firstname} ${matchObject.lastname}`}
            </a>
            <div className="description">
              {`${matchObject.age} years old`}
              <br />
              {`${matchObject.country}`}
            </div>
          </div>
          <div className="buttons-div">
            <Link
              to={{ pathname: `/Profile/${matchObject._id}` }}
              className="ui button blue match-buttons"
            >
              Profile
            </Link>
            <Link
              to={{ pathname: `/Chat/${matchObject._id}` }}
              className="ui button green match-buttons"
            >
              Chat
            </Link>
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

export default connect(mapStateToProps)(DisplayMatches);
