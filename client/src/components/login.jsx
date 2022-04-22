import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h2>Log in</h2>
            <form>
                <label>Username</label>
                <input name="username" type="text"/>
                <label>Password</label>
                <input name="password" type="text"/>
                {/*<Link to="/login">*/}
                {/*    <input type="submit">Log in</input>*/}
                {/*</Link>*/}
            </form>
        </div>
    )
}