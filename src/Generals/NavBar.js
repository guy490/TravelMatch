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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      height: "100%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  };
  const logoutButton = () => {
    if (getUserCredentialsFromLocalStorage()) {
      return (
        <Link
          to="/"
          className="item"
          onClick={logoutUser}
          style={{ width: "10%" }}
        >
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
          style={{ width: "29%" }}
        >
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
      style={{ backgroundColor: "white", width: 100 + "%", zIndex: "120" }}
    >
      <button
        onClick={history.goBack}
        className="item"
        style={{ width: "6%", paddingRight: "1%" }}
      >
        <div>
          <i className="angle left icon"></i>
        </div>
      </button>
      <Link
        to="/"
        className="item"
        href=" "
        style={{ width: "3%", paddingRight: "1%" }}
      >
        <i className="home icon"></i>
      </Link>
      {myMatchesButton()}
      <div className="right menu">
        <Link
          to={`/Profile/${userProfile._id}`}
          className="item"
          href=" "
          style={{ width: "35%", paddingRight: "1%" }}
        >
          {userProfile.username}
        </Link>
        {waitingMessagesButton()}
        {logoutButton()}
      </div>
      <WaitingMessages
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
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
