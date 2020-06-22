import React, { useEffect, useState, useRef } from "react";
import { server } from "../../api";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./DisplayProfile.css";

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
          className="profile-btn">
          <div className="profile-btn-title">Message</div>
        </Link>
      );
    }
    return (
      <Link
        to={{
          pathname: `/Edit/${userProfile._id}`,
        }}
        className="profile-btn">
        <div className="profile-btn-title">Edit</div>
      </Link>
    );
  };

  return (
    <div className="card-container">
      <div className="card-wrap">
        <img
          className="round"
          alt="ProfilePicture"
          src={`${userProfile.profile_image}`}
        />
        <h3 className="profile-name">
          {`${userProfile.firstname} ${userProfile.lastname}`}
        </h3>
        <p className="profile-country-age">
          {`${userProfile.age}`}, {`${userProfile.country}`}{" "}
        </p>
        <p className="profile-about">{userProfile.about}</p>
        {renderButtons()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUserProfile: state.profileReducer };
};

export default connect(mapStateToProps)(DisplayProfile);
