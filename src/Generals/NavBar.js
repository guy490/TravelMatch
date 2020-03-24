import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../Actions";

const NavBar = ({ userProfile, signOut }) => {
  const logoutUser = () => {
    localStorage.clear();
    signOut();
  };

  const logoutButton = () => {
    if (localStorage.getItem("Username")) {
      return (
        <Link to="/" className="item" onClick={logoutUser}>
          Logout
        </Link>
      );
    }
  };

  return (
    <div
      className="ui secondary menu fixed"
      style={{ backgroundColor: "white", width: 100 + "%" }}
    >
      <Link to="/" className="item">
        <div>
          <i className="arrow alternate circle left icon"></i>
          Back
        </div>
      </Link>
      <a className="item" href=" ">
        Home
      </a>
      <div className="right menu">
        <span className="item" href=" ">
          {userProfile.username}
        </span>
        {logoutButton()}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userProfile: state.profileReducer
  };
};

export default connect(mapStateToProps, { signOut })(NavBar);
