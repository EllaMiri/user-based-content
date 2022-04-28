import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Layout/header";
import Footer from "./Layout/footer";
import Main from "./Layout/main";
import Login from "./login";
import Register from "./register";
import LoggedInUser from "./loggedInUser";
import UserProvider from "../contexts/userContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loggedInUser" element={<LoggedInUser />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
