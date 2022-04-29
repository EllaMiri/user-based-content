import express from "express";
import { secure, postAuth } from "../middlewares/auth.js";
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

routes.put("/:id", secure, postAuth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const post = await postModel.findByIdAndUpdate(id, req.body);

    res.json({
      old: post,
      new: req.body,
    });
  } catch (err) {
    res.send(err);
  }
});

routes.delete("/:id", secure, postAuth, async (req, res) => {
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

export default routes;
