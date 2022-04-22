import React from "react";

export default function addPost() {
  return (
    <div>
      <form>
        <label>Title</label>
        <input type="text" placeholder="Title"></input>
        <label>
          Söker du nytt hem eller vill du adoptera? Information om ditt djur/vad
          du söker.
        </label>
        <textarea rows="4" cols="50"></textarea>
        <button>Lägg till</button>
      </form>
    </div>
  );
}
