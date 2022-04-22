import React from "react";
import "./main.css"

export default function Main() {
    return (
        <div className="main">
            <h3>Alla djurannonser</h3>
            <button>Lägg upp en annons</button>
            <div>

                <p className="posts">Findus söker nytt hem!</p>
                <p className="posts">Fluffig hårboll letar nytt hem!</p>
            </div>
        </div>
    )
}
