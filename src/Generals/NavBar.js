import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const logoutUser = () => {
    localStorage.clear();
  };
  return (
    <div className="ui secondary menu fixed">
      <Link to="/" className="item">
        <div>
          <i className="arrow alternate circle left icon"></i>
          Back
        </div>
      </Link>
      <a className="item" href=" ">
        Back
      </a>
      <a className="item" href=" ">
        Home
      </a>
      <a className="item" href=" ">
        Messages
      </a>
      <a className="item" href=" ">
        Friends
      </a>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>
        </div>
        <button className="ui item" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
