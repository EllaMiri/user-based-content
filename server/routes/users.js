import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.send("Other error...");
  }
});

routes.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(user);
    await user.save();

    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      res.send("Username already exists...");
      return;
    }
    res.send("Other error...");
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(id, req.body);

    res.json({
      old: user,
      new: req.body,
    });
  } catch (err) {
    if (err.code == 11000) {
      res.send("Username already exists...");
      return;
    }
    res.send("Other error...");
  }
});

routes.get("/:id", (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => user.id === id);

  if (findUser === undefined) {
    return res.status(404).send("Not found!");
  }
  if (findUser) {
    return res.send(findUser);
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await userModel.findByIdAndRemove(id);
    if (!removedUser) {
      res.send("ID doesn't exist!");
      return;
    }
    res.send("User removed!");
  } catch (err) {
    res.send("Other error...");
  }
});

routes.post("/login", async (req, res) => {
  // const user = req.body;
  const foundUser = await userModel.findOne({ username: req.body.username });

  const passCheck = await bcrypt.compare(req.body.password, foundUser.password);

  if (!foundUser || !passCheck) {
    return res.status(401).send("Wrong password or username");
  }

  if (req.session.id) {
    return res.send("Already logged in");
  }
  req.session.id = uuidv4();
  req.session.username = foundUser.username;
  req.session.loginDate = new Date();
  req.session.role = undefined;
  res.send("Successful login");
});

routes.get("/login", (req, res) => {
  if (!req.session.id) {
    return res.status(401).send("You are not logged in");
  }

  res.send(req.session);
});

// module.exports = routes;
export default routes;
