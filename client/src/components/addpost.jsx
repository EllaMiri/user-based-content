import React from "react";
import { Button, Form } from "react-bootstrap";

export default function addPost() {
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validation1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            isInvalid
            name="title"
            type="text"
            placeholder="title"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ditt användarnamn
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <label>Title</label>
      <input type="text" placeholder="Title"></input>
      <label>
        Söker du nytt hem eller vill du adoptera? Information om ditt djur/vad
        du söker.
      </label>
      <textarea rows="4" cols="50"></textarea>
      <Button variant="success">Lägg till</Button>
    </div>
  );
}
