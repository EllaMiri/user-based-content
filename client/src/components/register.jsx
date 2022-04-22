import React from "react";
import {Link} from "react-router-dom";

export default function Register() {
    return (
        <div>
            <h2>Register an account</h2>
            <form>
                <label>Username</label>
                <input type="text" name="username"/>
                <label>Password</label>
                <input type="text" name="password"/>
                <Link to="/register">
                    <input type="submit">Register</input>
                </Link>
            </form>
        </div>
    )
}