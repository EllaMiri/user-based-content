import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./addpost.css";
import useFormValidation from "../hooks/formValidation";
import axios from "axios";

export default function AddPost() {
  // let [validated, setValidated] = useFormValidation()

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postItems, setPostItems] = useState([]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const post = {
      title: postTitle,
      text: postText,
    };
    const addPostform = event.currentTarget;
    if (addPostform.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    // axios
    //   .post("http://localhost:4000/post/", post)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    try {
      const res = await axios.post("http://localhost:4000/post/", post);
      setPostItems((prev) => [...prev, res.data]);
      setPostTitle("");
      setPostText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/post/");
        setPostItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/post/${id}`);
      const newPostItems = postItems.filter((item) => item._id !== id);
      setPostItems(newPostItems);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
              value={postTitle}
            />
            <Form.Control.Feedback type="invalid">
              Skriv in ditt användarnamn
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="md-3">
          <Form.Group as={Col} md="20" controlId="validation2">
            <Form.Label>
              Söker du nytt hem eller vill du adoptera? Information om ditt
              djur/vad du söker.
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              type="text"
              onChange={(e) => {
                setPostText(e.target.value);
              }}
              value={postText}
            />
          </Form.Group>
        </Row>
        <Button variant="success" type="submit">
          Lägg till
        </Button>
      </Form>
      <div>
        {postItems.map((post) => (
          <div className="posts">
            <p
              onClick={() => {
                deletePost(post._id);
              }}
              className="remove-btn"
            >
              ❌
            </p>
            <p>{post.title}</p>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
