import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/login.css";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Login() {
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
      <h2>Logga in</h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validation1">
          <Form.Label>Användarnamn</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="användarnamn"
          />
          <Form.Control.Feedback>
            Skriv in ditt användarnamn
          </Form.Control.Feedback>
        </Form.Group>
        </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validation2">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                  required
                  type="text"
                  placeholder="lösenord"
              />
              <Form.Control.Feedback>
                Skriv in ditt lösenord
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

        <Button variant="success" type="submit">
          Logga in
        </Button>
      </Form>

      <Link to="/register">
        <p>Inte registrerad?</p>
      </Link>
      <p>Glömt lösenord?</p>
    </div>
  )}
