import "./DisplayProfile.css";
import React, { useEffect, useState, useRef } from "react";
import { server } from "../../api";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const DisplayProfile = ({ match, currentUserProfile }) => {
  const [userProfile, setUserProfile] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    joined: "",
    country: "",
    age: "",
    about: "",
  });
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await server.get("/get_profile", {
        params: match.params,
      });
      if (componentIsMounted.current) {
        setUserProfile(response.data);
      }
    };
    fetchProfile();
  }, [match]);

  const renderButtons = () => {
    if (userProfile._id === "") {
      return;
    }
    if (userProfile._id !== currentUserProfile._id) {
      return (
        <Link
          to={{
            pathname: `/Chat/${userProfile._id}&${userProfile.username}`,
          }}
          className="ui button green match-buttons"
        >
          Chat
        </Link>
      );
    }
    return (
      <Link
        to={{
          pathname: `/Edit/${userProfile._id}`,
        }}
        className="ui button green match-buttons"
      >
        Edit
      </Link>
    );
  };

  return (
    <div className="ui card profile-card">
      <div className="image">
        <img alt="ProfilePicture" src={`${userProfile.profile_image}`} />
      </div>
      {renderButtons()}
      <div className="content profile-content">
        <h3 href=" " className="header">
          {`${userProfile.firstname} ${userProfile.lastname}`}
        </h3>
        <div className="meta">
          <div className="date">{`<Joined Date>`}</div>
          <div className="country">{`${userProfile.country}`}</div>
          <div className="age">{`${userProfile.age}`}</div>
        </div>
        <div className="description">{`<About Data>`}</div>
      </div>
      <div className="extra content">
        <span></span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUserProfile: state.profileReducer };
};

export default connect(mapStateToProps)(DisplayProfile);
