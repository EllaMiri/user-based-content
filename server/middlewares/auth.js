import mongoose from "mongoose";
import postModel from "../models/post.model.js";

export function secure(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("You must login...");
  }
}

export async function updateAuth(req, res, next) {
  const post = await postModel.findById(req.body._id);
  console.log(req.session.user._id);
  console.log(post.user._id.toString());
  if (req.session.user._id === post.user._id.toString()) {
    next();
  } else {
    res.status(401).json("This is not your post!");
  }
}

export async function documentAuth(req, res, next) {
  if (req.params._id) {
    const post = await postModel.findById(req.params._id);
  } else if (!req.params._id) {
    const post = await postModel.findById(req.body._id);
  }
  console.log(req.session.user._id);
  console.log(post.user._id.toString());
  if (req.session.user._id === post.user._id.toString()) {
    next();
  } else {
    res.status(401).json("This is not your post!");
  }
}
