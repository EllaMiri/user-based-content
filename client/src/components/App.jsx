import React from "react";
// import { Route, Routes } from "react-router-dom";
import Header from "./Layout/header";
import Footer from "./Layout/footer";
import Main from "./Layout/main";
// import Login from "./login";
// import Register from "./register";

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
      {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes> */}
    </div>
  );
}

export default App;
