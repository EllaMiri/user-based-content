import React from "react";
import "./header.css"
import {Link} from "react-router-dom";


function Header() {
    return (
        <div className="header">
            <Link to="/">
                <h1>Cats and dogs</h1>
            </Link>
            <Link to="/login">
                <span>Logga in/Registrera dig</span>
            </Link>
        </div>
    );
}




export default Header;