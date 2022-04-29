import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/register.css";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const loginForm = event.currentTarget;
    event.preventDefault();

    const registered = {
      username: username,
      email: email,
      password: password,
    };
    // Validation for the form
    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    await axios
      .post("http://localhost:4000/user/", registered)
      .then((res) => {
        if (res.status === 204) {
          toast.warn("Username already exists!");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="registerContainer">
      <div className="background-register-box">
        <h2>Registrera ett konto</h2>
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
        {/* Register an account form */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="md-3">
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
                Välj ett användarnamn
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="md-3">
            <Form.Group as={Col} md="12" controlId="validation2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
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
            <Form.Group as={Col} md="12" controlId="validationCustom3">
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
                Skriv in ett lösenord
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button
            className="submitBtn"
            type="submit"
            variant="success"
            value="Submit"
          >
            Registrera
          </Button>
        </Form>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <span>Logga in?</span>
        </Link>
      </div>
    </div>
  );
}
