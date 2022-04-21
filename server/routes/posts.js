import express from "express";
import { v4 as uuidv4 } from "uuid";

const routes = express.Router();

let posts = [
  {
    username: "Ella",
    title: "Golden retriever for adoption",
    description: "A golden retriver puppy that needs a new home.",
    id: uuidv4(),
    date: new Date(),
  },
];

routes.get("/", (req, res) => {
  console.log(posts);
  res.status(200);
  res.json(posts);
});

routes.post("/", (req, res) => {
  const post = req.body;
  res.status(201);
  res.send("Post created!");
  posts.push({ ...post, id: uuidv4(), date: new Date() });
});

routes.put("/:id", (req, res) => {
  const postId = req.body.id;
  const { username, title, description, id, date } = req.body;

  const foundPost = posts.find((post) => post.id === postId);

  if (!foundPost) {
    res.status(404);
    res.send("There is no post with that ID to update.");
  } else {
    posts = posts.map(function (post) {
      if (post.id === postId) {
        return {
          username,
          title,
          description,
          id: post.id,
          date: new Date(),
        };
      }
      return post;
    });
    res.status(200);
    res.send("Post updated!");
  }
});

// routes.get("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   const findUser = users.find((user) => user.id === id);

//   if (findUser === undefined) {
//     return res.status(404).send("Not found!");
//   }
//   if (findUser) {
//     return res.send(findUser);
//   }
// });

routes.delete("/:id", (req, res) => {
  //   const { id } = req.params;
  //   users = users.filter((users) => users.id !== id);

  //   res.send(`User with ${id} has been deleted`);
  const postId = req.params.id;

  const foundPost = posts.find((post) => post.id === postId);

  if (!foundPost) {
    res.status(404);
    res.send("There is no post with that ID to delete.");
  } else {
    posts = posts.filter(function (post) {
      return post.id !== postId;
    });
    res.status(200);
    res.send("Post deleted!");
  }
});

// module.exports = routes;
export default routes;
