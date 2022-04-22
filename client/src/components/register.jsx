import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/register.css";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Register() {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    const loginForm = event.currentTarget;

    const registered = {
      username: username,
      email: email,
      password: password,
    };

    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    axios
      .post("http://localhost:4000/user/", registered)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setUsername("");
    setEmail("");
    setPassword("");
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
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={username}
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
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
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
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
            <Form.Control.Feedback type="invalid">
              Skriv in ett lösenord
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" variant="success" value="Submit">
          Registrera
        </Button>
      </Form>

      <Link to="/login">
        <p>Logga in?</p>
      </Link>
    </div>
  );
}
