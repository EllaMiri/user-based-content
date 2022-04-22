import React from "react";
import "./main.css";
import AddPost from "../addpost";
import { Button } from "react-bootstrap";

function Main() {
  // function toogle() {
  //   let postMenu = document.getElementById("menu");
  //   if (postMenu.style.display === "none") {
  //     return (postMenu.style.display = "block");
  //   } else {
  //     return (postMenu.style.display = "none");
  //   }
  // }

  return (
    <div className="main">
      <h3>Alla djurannonser</h3>
      <Button variant="success">Lägg upp en annons</Button>
      <div id="menu">
        <AddPost />
      </div>
      <div>
        <p className="posts">Findus söker nytt hem!</p>
        <p className="posts">Fluffig hårboll letar nytt hem!</p>
      </div>
    </div>
  );
}

export default Main;
