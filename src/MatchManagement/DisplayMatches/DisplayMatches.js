import "./DisplayMatches.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { server } from "../../api";
import { SegmentInline } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DisplayMatches = ({ matchDetails }) => {
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await server.get("/get_matches", {
        params: matchDetails
      });
      setMatchList(response.data);
    };
    fetchMatches();
  }, [matchDetails]);

  const renderMatches = () => {
    if (matchList.length === 0) {
      return;
    }
    return matchList.map(match => {
      return (
        <div
          key={match._id}
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
              {`${match.firstname} ${match.lastname}`}
            </a>
            <div className="description">
              {`${match.age} years old`}
              <br />
              {`${match.country}`}
            </div>
          </div>
          <div className="buttons-div">
            <Link
              to={{ pathname: `/Profile/${match._id}` }}
              className="ui button blue match-buttons"
            >
              Profile
            </Link>
            <div className="ui button green match-buttons">Chat</div>
          </div>
        </div>
      );
    });
  };
  return <div className="ui celled list">{renderMatches()}</div>;
};

const mapStateToProps = state => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMatches);
