import React from "react";
import { Link } from "react-router-dom";
import "../components/login.css";

export default function Login() {
  return (
    <div className="style">
      <h2>Logga in</h2>

      <form>
        <label>Username</label>
        <input name="username" type="text" placeholder="användarnamn" />
        <label>Password</label>
        <input name="password" type="text" placeholder="lösenord" />
        <button>Logga in</button>
      </form>

      <Link to="/register">
        <p>Inte registrerad?</p>
      </Link>
      <p>Glömt lösenord?</p>
    </div>
  );
}
