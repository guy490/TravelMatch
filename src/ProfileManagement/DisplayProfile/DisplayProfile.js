import React from "react";

const DisplayProfile = ({ match }) => {
  return <div>{console.log(match.params)}</div>;
};

export default DisplayProfile;
