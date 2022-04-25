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
    <div className="loginContainer">
      <div className="background-login-box">
        <h2>Logga in</h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validation1">
              <Form.Label>Användarnamn</Form.Label>
              <Form.Control
                size="lg"
                required
                type="text"
                placeholder="användarnamn"
              />
              <Form.Control.Feedback type="invalid">
                Skriv in ditt användarnamn
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validation2">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                size="lg"
                required
                type="password"
                placeholder="lösenord"
              />
              <Form.Control.Feedback type="invalid">
                Skriv in ditt lösenord
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button className="loginBtn" variant="success" type="submit">
            Logga in
          </Button>
        </Form>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <span>Inte registrerad?</span>
        </Link>
        <span>Glömt lösenord?</span>
      </div>
    </div>
  );
}
