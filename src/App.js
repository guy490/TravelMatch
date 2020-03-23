import React from "react";
import UserManagementApp from "./UserManagement/UserManagementApp";
import CategoryApp from "./CategoriesManagment/CategoryManagmentApp";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Generals/NavBar";

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <NavBar />
      <CategoryApp />
      <UserManagementApp />
    </BrowserRouter>
  );
};

export default App;
