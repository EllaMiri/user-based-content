import express from "express";
import { secure, updateAuth, documentAuth } from "../middlewares/auth.js";
import postModel from "../models/post.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const posts = await postModel
      .find({ user: req.session.user._id })
      .populate("user");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("Other error...");
  }
});

routes.get("/all", async (req, res) => {
  try {
    const posts = await postModel.find({}).populate("user");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("Other error...");
  }
});

routes.post("/", secure, async (req, res) => {
  console.log(req.session.user);
  try {
    const post = new postModel({
      user: req.session.user,
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

routes.put("/:id", secure, updateAuth, async (req, res) => {
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

routes.delete("/:id", secure, documentAuth, async (req, res) => {
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
