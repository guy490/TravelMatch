import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { server } from "../api";

const DisplayMatches = ({ matchDetails }) => {
  const [matchList, setMatchList] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await server.get("/get_matches", {
        params: matchDetails
      });
      setMatchList(response.data);
    };
    fetchMatches();
  }, [matchDetails, matchList]);
  return <div>{console.log(matchDetails)}</div>;
};

const mapStateToProps = state => {
  return { matchDetails: state.matchReducer };
};

export default connect(mapStateToProps)(DisplayMatches);
