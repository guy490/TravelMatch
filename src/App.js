import React from "react";
import UserManagementApp from "./UserManagement/UserManagementApp";
import CategoryApp from "./CategoriesManagement/CategoryManagmentApp";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Generals/NavBar";
import MatchManagementApp from "./MatchManagement/MatchManagementApp";

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <NavBar />
      <div style={{ paddingTop: 45 + "px" }}>
        <CategoryApp />
        <UserManagementApp />
        <MatchManagementApp />
      </div>
    </BrowserRouter>
  );
};

export default App;
