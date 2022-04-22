import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/login.css";
import { Form, Button } from "react-bootstrap";

export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const loginForm = event.currentTarget;
    if (loginForm.checkValidaity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="style">
      <h2>Logga in</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validation1">
          <Form.Label>Användarnamn</Form.Label>
          <Form.Control
            required
            isInvalid
            name="username"
            type="text"
            placeholder="användarnamn"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ditt användarnamn
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validation2">
          <Form.Label>Lösenord</Form.Label>
          <Form.Control
            required
            isInvalid
            name="password"
            type="text"
            placeholder="lösenord"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ditt lösenord
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type="submit">
          Logga in
        </Button>
      </Form>

      <Link to="/register">
        <p>Inte registrerad?</p>
      </Link>
      <p>Glömt lösenord?</p>
    </div>
  );
}
