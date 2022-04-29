import mongoose from "mongoose";
import postModel from "../models/post.model.js";

// Authention to check is the user is logged in
export function secure(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("You must login...");
  }
}

// Authention for the posts, only the user with the right ID can delete or edit their own post
export async function postAuth(req, res, next) {
  const post = await postModel.findById(req.params.id);
  if (req.session.user._id === post.user._id.toString()) {
    next();
  } else {
    res.status(401).json("This is not your post!");
  }
}
