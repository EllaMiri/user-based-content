import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Collapse } from "react-bootstrap";
import "./addpost.css";
// import useFormValidation from "../hooks/formValidation";
import axios from "axios";

export default function AddPost() {
  // let [validated, setValidated] = useFormValidation()
  const [open, setOpen] = useState(false);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postItems, setPostItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updatePostTitle, setUpdatePostTitle] = useState("");
  const [updatePostText, setUpdatePostText] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          alert("You must login!");
        }
        return error;
      }
    );
    event.preventDefault();
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
      const res = await axios.post("http://localhost:4000/post/", post, {
        withCredentials: true,
      });
      setPostItems((prev) => [...prev, res.data]);
      setPostTitle("");
      setPostText("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/post/", {
          withCredentials: true,
        });
        setPostItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/post/${id}`, {
        withCredentials: true,
      });
      const newPostItems = postItems.filter((item) => item._id !== id);
      setPostItems(newPostItems);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updatedPost = {
    title: updatePostTitle,
    text: updatePostText,
  };
  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/post/${isUpdating}`,
        updatedPost,
        { withCredentials: true }
      );
      setUpdatePostText("");
      setUpdatePostTitle("");
      setIsUpdating("");
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const renderUpdateForm = () => (
    <Form
      className="formAddPost"
      noValidate
      validated={validated}
      onSubmit={(e) => {
        updatePost(e);
      }}
    >
      <Row className="md-3">
        <Form.Group as={Col} md="12" controlId="validation1">
          <Form.Label className="fs-5">Title</Form.Label>
          <Form.Control
            size="lg"
            required
            type="text"
            placeholder="Ny titel"
            onChange={(e) => {
              setUpdatePostTitle(e.target.value);
            }}
            value={updatePostTitle}
          />
          <Form.Control.Feedback type="invalid">
            Skriv in ditt användarnamn
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="md-3">
        <Form.Group as={Col} md="12" controlId="validation2">
          <Form.Label className="fs-5">
            Uppdatera ditt inlägg med ny titel och text!
          </Form.Label>
          <Form.Control
            size="lg"
            required
            as="textarea"
            placeholder="Ny text"
            type="text"
            onChange={(e) => {
              setUpdatePostText(e.target.value);
            }}
            value={updatePostText}
          />
          <Form.Control.Feedback type="invalid">
            Saknas information
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="addBtn" variant="success" type="submit">
        Ändra
      </Button>
    </Form>
  );

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="success"
        className="newBtn"
      >
        Ny annons
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" className="addPostContainer">
          <Form
            className="formAddPost"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="md-3">
              <Form.Group as={Col} md="12" controlId="validation1">
                <Form.Label className="fs-5">Title</Form.Label>
                <Form.Control
                  size="lg"
                  required
                  type="text"
                  placeholder="Titel"
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
              <Form.Group as={Col} md="12" controlId="validation2">
                <Form.Label className="fs-5">
                  Söker du nytt hem eller vill du adoptera? Information om ditt
                  djur/vad du söker.
                </Form.Label>
                <Form.Control
                  size="lg"
                  required
                  as="textarea"
                  placeholder="Information..."
                  type="text"
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
                  value={postText}
                />
                <Form.Control.Feedback type="invalid">
                  Saknas information
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button className="addBtn" variant="success" type="submit">
              Lägg till
            </Button>
          </Form>
        </div>
      </Collapse>
      <div>
        {postItems.map((post) => (
          <div className="postContainer">
            {isUpdating === post._id ? (
              renderUpdateForm()
            ) : (
              <>
                <div className="posts">
                  <div className="interactIcons">
                    <p
                      onClick={() => {
                        setIsUpdating(post._id);
                      }}
                      className="remove-btn"
                    >
                      🖊
                    </p>
                    <p
                      onClick={() => {
                        deletePost(post._id);
                      }}
                      className="remove-btn"
                    >
                      ❌
                    </p>
                  </div>
                  <h5>{post.user?.username}</h5>
                  <h4>{post.title}</h4>
                  <p>{post.text}</p>
                  <p className="postDate">{today.toLocaleDateString()}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
