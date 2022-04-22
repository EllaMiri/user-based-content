import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/register.css";
import {Form, Button, Row, Col} from "react-bootstrap";

export default function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="style">
      <h2>Registrera ett konto</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="md-3">
        <Form.Group as={Col} md="4" controlId="validation1">
          <Form.Label>Användarnamn</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="användarnamn"
          />
          <Form.Control.Feedback type="invalid">
            Välj ett användarnamn
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

        <Row className="md-3">
        <Form.Group as={Col} md="4" controlId="validation2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="email"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in din email
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

      <Row className="md-3">
        <Form.Group as={Col} md="4" controlId="validationCustom3">
          <Form.Label>Lösenord</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="lösenord"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ett lösenord
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant="success" type="submit">Registrera</Button>
      </Form>


      <Link to="/login">
        <p>Logga in?</p>
      </Link>
    </div>
  );
}
