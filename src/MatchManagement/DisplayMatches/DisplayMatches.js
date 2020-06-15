import "./DisplayMatches.css";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { server, socket } from "../../api";
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
    const fetchData = async () => {
      const response = await server.get("/get_matches", {
        params: {
          ...match.params,
          date: decodeURIComponent(match.params.date),
        },
      });
      setMatchList(response.data);
    };
    fetchData();
  }, [match]);

  useEffect(() => {
    decodeURIComponent(match.params.date);
    socket.on("displayNewMatches", async () => {
      const response = await server.get("/get_matches", {
        params: {
          ...match.params,
          date: decodeURIComponent(match.params.date),
        },
      });
      console.log("Accepted");
      if (componentIsMounted.current) {
        setMatchList(response.data);
      }
    });
    return () => {
      socket.off("displayNewMatches");
    };
  }, [match]);

  const isValidAge = (fromAge, toAge) => {
    return (
      fromAge !== undefined &&
      toAge !== undefined &&
      fromAge !== "0" &&
      toAge !== "0"
    );
  };
  const isValidGender = (gender) => {
    return gender !== undefined && gender !== "None";
  };
  const isValidCountry = (country) => {
    return country !== undefined && country !== "None";
  };

  const filterMatchList = (matchList, filters) => {
    const clonedList = [...matchList];
    return clonedList.filter((user) => {
      let isUserValid = true;
      if (user._id === match.params.userID) {
        return false;
      }
      if (isValidCountry(filters.country)) {
        isUserValid = isUserValid && filters.country === user.country;
      }

      if (isValidGender(filters.gender)) {
        isUserValid = isUserValid && filters.gender === user.gender;
      }

      if (isValidAge(filters.fromAge, filters.toAge)) {
        isUserValid =
          isUserValid &&
          filters.fromAge <= user.age &&
          filters.toAge >= user.age;
      }

      return isUserValid;
    });
  };

  const renderMatches = () => {
    const filteredList = filterMatchList(matchList, match.params);
    if (filteredList.length === 0) {
      return;
    }

    return filteredList.map((matchObject) => {
      return (
        <div
          key={matchObject._id}
          style={{ margin: "5px", paddingTop: "10px" }}
          className="item">
          <img
            alt=""
            className="ui avatar image match-profile-image"
            src={`${matchObject.profile_image}`}
          />
          <div className="content">
            <div
              to={{ pathname: `/Profile/${matchObject._id}` }}
              className="header-link">
              {`${matchObject.firstname} ${matchObject.lastname}`}
            </div>
            <div className="description">
              {`${matchObject.age} years old`}
              <br />
              {`${matchObject.country}`}
            </div>
          </div>
          <div className="match-buttons-div">
            <Link
              to={{ pathname: `/Profile/${matchObject._id}` }}
              className="ui circular icon basic button">
              <i className="user circle icon"></i> Profile
            </Link>
            <Link
              to={{
                pathname: `/Chat/${matchObject._id}&${matchObject.username}`,
              }}
              className="ui circular icon basic button">
              <i className="comments outline icon match-button-icon"></i> Chat
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="page-title">
        Matches
        <hr />
      </div>
      <div className="ui divided list">{renderMatches()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMatches);
