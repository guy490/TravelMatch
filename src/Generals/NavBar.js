import React from "react";
import { getUserCredentials } from "../utilities";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../Redux/Actions";
import { socket } from "../api";

const NavBar = ({ userProfile, signOut }) => {
  const history = useHistory();
  const logoutUser = () => {
    localStorage.clear();
    signOut();
    socket.emit("removeFromClientList", userProfile._id);
  };

  const logoutButton = () => {
    if (getUserCredentials()) {
      return (
        <Link
          to="/"
          className="item"
          onClick={logoutUser}
          style={{ width: 50 + "%" }}
        >
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
      <button
        onClick={history.goBack}
        className="item"
        style={{ width: 10 + "%" }}
      >
        <div>
          <i className="arrow alternate circle left icon"></i>
          Back
        </div>
      </button>
      <Link to="/" className="item" href=" " style={{ width: 10 + "%" }}>
        Home
      </Link>
      <Link
        to={`/MyMatches/${userProfile._id}`}
        className="item"
        style={{ width: 20 + "%" }}
      >
        <div>My Matches</div>
      </Link>
      <div className="right menu" style={{ width: 50 + "%" }}>
        <Link
          to={`/Profile/${userProfile._id}`}
          className="item"
          href=" "
          style={{ width: 50 + "%" }}
        >
          {userProfile.username}
        </Link>
        {logoutButton()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.profileReducer,
  };
};

export default connect(mapStateToProps, { signOut })(NavBar);
