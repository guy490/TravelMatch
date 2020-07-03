import React from "react";
import { getUserCredentialsFromLocalStorage } from "../utilities";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../Redux/Actions";
import { socket } from "../api";
import WaitingMessages from "../ChatManagement/WaitingMessages/WaitingMessages";

const NavBar = ({ userProfile, signOut }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const history = useHistory();
  const logoutUser = () => {
    localStorage.clear();
    closeModal();
    signOut();
    socket.emit("removeFromClientList", userProfile._id);
  };

  const logoutButton = () => {
    if (getUserCredentialsFromLocalStorage()) {
      return (
        <Link
          to="/"
          className="item"
          onClick={logoutUser}
          style={{ width: "10%" }}>
          Logout
        </Link>
      );
    }
  };

  const myMatchesButton = () => {
    if (getUserCredentialsFromLocalStorage()) {
      return (
        <Link
          to={`/MyMatches/${userProfile._id}`}
          className="item"
          style={{ width: "29%" }}>
          <div>My Matches</div>
        </Link>
      );
    }
  };

  const waitingMessagesButton = () => {
    if (getUserCredentialsFromLocalStorage()) {
      return (
        <button onClick={openModal} className="item" style={{ width: "5%" }}>
          <i className="envelope outline icon"></i>
        </button>
      );
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="ui secondary menu fixed"
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "4vh",
        zIndex: "120",
        fontFamily: "Rubik, sans-serif",
        fontSize: "13px",
      }}>
      <button
        onClick={history.goBack}
        className="item"
        style={{ width: "6%", paddingRight: "1%" }}>
        <div>
          <i className="angle left icon"></i>
        </div>
      </button>
      <Link
        to="/"
        className="item"
        href=" "
        style={{ width: "3%", paddingRight: "1%" }}>
        <img
          src="./logo.png"
          alt=""
          style={{ width: "22px", height: "22px" }}></img>
      </Link>
      {myMatchesButton()}
      <div className="right menu">
        <Link
          to={`/Profile/${userProfile._id}`}
          className="item"
          href=" "
          style={{ width: "35%", paddingRight: "1%" }}>
          {userProfile.username}
        </Link>
        {waitingMessagesButton()}
        {logoutButton()}
      </div>
      <WaitingMessages
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        currentUsername={userProfile.username}
        closeModal={closeModal}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userProfile: state.profileReducer,
  };
};

export default connect(mapStateToProps, { signOut })(NavBar);
