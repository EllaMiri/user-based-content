import React, { useState } from "react";
import {Button, Form, Row, Col} from "react-bootstrap";
import './addpost.css';
import useFormValidation from "../hooks/formValidation";


export default function AddPost() {
// let [validated, setValidated] = useFormValidation()

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const addPostform = event.currentTarget;
        if (addPostform.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

  return (
    <div className="formAddPost">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="md-3">
        <Form.Group as={Col} md="12" controlId="validation1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="title"
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ditt användarnamn
          </Form.Control.Feedback>
        </Form.Group>
          </Row>

          <Row className="md-3">
          <Form.Group as={Col} md="20" controlId="validation2">
              <Form.Label>
                  Söker du nytt hem eller vill du adoptera? Information om ditt djur/vad
                  du söker.
              </Form.Label>
              <Form.Control
                  required
                  as="textarea"
                  type="text"
              />
          </Form.Group>
      </Row>
          <Button variant="success" type="submit">Lägg till</Button>
      </Form>


    </div>
  );
}
