import React from "react";
import "./main.css";
import AddPost from "../addpost";

function Main() {
  return (
    <div className="main">
      <div className="background-box">
        <div className="allPosts">
          <h3 className="mainTitle">Alla djurannonser</h3>
          <AddPost />
        </div>
      </div>
    </div>
  );
}

export default Main;
