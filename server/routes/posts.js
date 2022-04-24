import express from "express";
import { v4 as uuidv4 } from "uuid";
import postModel from "../models/post.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("Other error...");
  }
});

routes.post("/", async (req, res) => {
  try {
    const post = new postModel({
      username: req.body.username,
      title: req.body.title,
      text: req.body.text,
      date: req.body.date,
    });
    console.log(post);
    await post.save();

    res.json(post);
  } catch (err) {
    res.send(err);
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findByIdAndUpdate(id, req.body);

    res.json({
      old: post,
      new: req.body,
    });
  } catch (err) {
    res.send(err);
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

routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedPost = await postModel.findByIdAndRemove(id);
    if (!removedPost) {
      res.send("ID doesn't exist!");
      return;
    }
    res.send("Post removed!");
  } catch (err) {
    res.send("Other error...");
  }
});

// module.exports = routes;
export default routes;
