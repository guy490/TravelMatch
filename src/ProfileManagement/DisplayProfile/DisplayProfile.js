import "./DisplayProfile.css";
import React, { useEffect, useState, useRef } from "react";
import { server } from "../../api";
import { Link } from "react-router-dom";

const DisplayProfile = ({ match }) => {
  const [userProfile, setUserProfile] = useState({
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

  return (
    <div className="ui card profile-card">
      <div className="image">
        <img
          alt="ProfilePicture"
          src="https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1-300x300.png"
        />
      </div>
      <Link
        to={{ pathname: `/Chat/${userProfile._id}&${userProfile.username}` }}
        className="ui button green match-buttons">
        Chat
      </Link>
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

export default DisplayProfile;
