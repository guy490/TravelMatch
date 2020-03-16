import React from "react";
import UserManagementApp from "./UserManagement/UserManagementApp";
import CategoryApp from "./SelectCategory/CategoryApp";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <CategoryApp />
      <UserManagementApp />
    </BrowserRouter>
  );
};

export default App;
