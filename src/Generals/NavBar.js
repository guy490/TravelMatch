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
      // position: "absolute",
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
          style={{ width: 50 + "%" }}
        >
          Logout
        </Link>
      );
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      className="ui secondary menu fixed"
      style={{ backgroundColor: "white", width: 100 + "%", zIndex: "120" }}
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
          style={{ width: 25 + "%" }}
        >
          {userProfile.username}
        </Link>
        <button
          onClick={openModal}
          className="item"
          style={{ width: 25 + "%" }}
        >
          <i className="envelope outline icon"></i>
        </button>
        {logoutButton()}
      </div>
      <WaitingMessages
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        receiverName={userProfile.username}
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
