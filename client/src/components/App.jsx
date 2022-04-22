import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Layout/header";
import Footer from "./Layout/footer";
import Main from "./Layout/main";
import Login from "./login";
import Register from "./register";

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
