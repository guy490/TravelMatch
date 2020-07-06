import React from "react";
import UserManagementApp from "./UserManagement/UserManagementApp";
import CategoryApp from "./CategoriesManagement/CategoryManagmentApp";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Generals/NavBar";
import MatchManagementApp from "./MatchManagement/MatchManagementApp";
import ProfileManagementApp from "./ProfileManagement/ProfileManagementApp";
import ChatManagmentApp from "./ChatManagement/ChatManagementApp";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <NavBar />
      <div style={{ paddingTop: "6vh" }}>
        <CategoryApp />
        <UserManagementApp />
        <MatchManagementApp />
        <ProfileManagementApp />
        <ChatManagmentApp />
      </div>
    </BrowserRouter>
  );
};

export default App;
