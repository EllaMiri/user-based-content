import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/login.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/userContext";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation for the form
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      setValidated(true);
    } else {
      loginRes();
    }
  };

  const loginRes = async () => {
    let status = await context.login(username, password);
    if (status) {
      setUsername("");
      setPassword("");
      navigate("/");
    } else {
      toast.error("Wrong password or username!");
      setUsername("");
      setPassword("");
    }
  };

  console.log(context.isLoggedIn);
  if (context.isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="loginContainer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="background-login-box">
        <h2>Logga in</h2>

        {/* Login form */}
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
