import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { server, socket } from "../../api";
import { connect } from "react-redux";
import { createDictionaryForm } from "../../utilities";
const countries = require("../../Generals/countries.json");

const FilterModal = ({ userCredentials, location, placeID, ...props }) => {
  let history = useHistory();
  //   const [participants, setParticipants] = useState();
  //   const [fromAge, setFromAge] = useState();
  //   const [toAge, setToAge] = useState();
  //   const [gender, setGender] = useState(0);
  //   const [country, setCountry] = useState(countries[106].name);
  const [matchUserDetails, setmatchUserDetails] = useState({
    userID: null,
    placeID: null,
    latitude: null,
    longitude: null,
  });
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  useEffect(() => {
    setmatchUserDetails({
      userID: userCredentials._id,
      placeID: placeID,
      ...location,
    });
  }, [userCredentials, placeID, location]);

  const findMatches = async (event) => {
    event.preventDefault();
    let formData = createDictionaryForm(event);
    console.log(formData);
    server
      .post("/match_request", matchUserDetails)
      .then(function (response) {
        socket.emit("newMatchInserted");
        console.log(response);
        history.push(`/Matches/${createURLParameters()}`);
      })
      .catch(function (error) {
        console.log(error.request.responseText);
      });
  };

  const createURLParameters = () => {
    let urlParameters = "";
    const keys = Object.keys(matchUserDetails);
    keys.forEach((key, ind) => {
      if (ind < keys.length - 1) {
        urlParameters += matchUserDetails[key] + "&";
      } else {
        urlParameters += matchUserDetails[key];
      }
    });
    return urlParameters;
  };

  const generateCountries = () => {
    return countries.map((country) => {
      return (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      );
    });
  };

  return (
    <Modal style={modalStyles} {...props}>
      <form className="ui form" onSubmit={findMatches}>
        <div className="field">
          <label>Number of participants:</label>
          <input
            type="number"
            name="participants"
            placeholder="Amount of participants you wish"
          />
        </div>
        <div className="field">
          <label>Age range:</label>
          from
          <input type="number" name="from-age" placeholder="From Age" />
          to
          <input type="number" name="to-age" placeholder="To Age" />
        </div>
        <div className="field">
          <label>Gender</label>
          <select name="gender">
            <option key="None" value={0}>
              None
            </option>
            <option key="Male" value={1}>
              Male
            </option>
            <option key="Female" value={2}>
              Female
            </option>
          </select>
        </div>
        <div className="field">
          <label>Country</label>
          <select name="country">
            <option key="None" value="None">
              None
            </option>
            {generateCountries()}
          </select>
        </div>

        <button className="ui button green" type="submit">
          Find Match
        </button>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userCredentials: state.profileReducer,
    location: state.locationReducer,
  };
};

export default connect(mapStateToProps)(FilterModal);
