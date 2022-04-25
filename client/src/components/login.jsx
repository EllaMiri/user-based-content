import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/login.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    const user = {
      username: username,
      password: password,
    };
    event.preventDefault();

    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      setValidated(true);
    }

    axios
      .post("http://localhost:4000/user/login/", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setUsername("");
    setPassword("");
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
                onChange={(e) => setUsername(e.currentTarget.value)}
                value={username}
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
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
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
