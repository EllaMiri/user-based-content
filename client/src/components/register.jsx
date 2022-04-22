import React from "react";
import { Link } from "react-router-dom";
import "../components/register.css";

export default function Register() {
  return (
    <div className="style">
      <h2>Registrera ett konto</h2>

      <form>
        <label>Username</label>
        <input name="username" type="text" placeholder="användarnamn" />
        <label>Email</label>
        <input name="email" type="text" placeholder="example@mail.com" />
        <label>Password</label>
        <input name="password" type="text" placeholder="lösenord" />
        <button>Registrera</button>

        <Link to="/login">
          <p>Logga in?</p>
        </Link>
      </form>
    </div>
  );
}
