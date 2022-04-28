import { React, useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import "./header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";

function Header() {
  const context = useContext(UserContext);

  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Cats and dogs</h1>
      </Link>
      {context.isLoggedIn ? (
        <div>
          <span>{context.isLoggedIn.username}</span>
          <Button onClick={context.logout} variant="success" type="submit">
            Logga ut
          </Button>
        </div>
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span>Logga in/Registrera dig</span>
        </Link>
      )}
      ;
    </div>
  );
}

export default Header;
