import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/register.css";
import { Form, Button } from "react-bootstrap";

export default function Register() {
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
      <h2>Registrera ett konto</h2>

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
            Välj ett användarnamn
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validation2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            isInvalid
            name="email"
            type="text"
            placeholder="email"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in din email
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
            Skriv in ett lösenord
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
      <Button variant="success">Registrera</Button>

      <Link to="/login">
        <p>Logga in?</p>
      </Link>
    </div>
  );
}
