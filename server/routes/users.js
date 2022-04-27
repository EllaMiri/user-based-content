import express from "express";
import { secure } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const routes = express.Router();

routes.get("/", secure, async (req, res) => {
  try {
    const user = await userModel.findById(req.session.user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.send("Other error...");
  }
});

routes.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const registeredUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  registeredUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(204).send("Username already exists");
      }
    });
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
  const foundUser = await userModel
    .findOne({ username: req.body.username })
    .select("+password");

  //Kolla att användaren finns
  console.log(req.body, foundUser);

  if (foundUser === null) {
    return res.status(401).send("Wrong password or username");
  }

  const passCheck = await bcrypt.compare(req.body.password, foundUser.password);

  if (!passCheck) {
    return res.status(401).send("Wrong password or username");
  }

  if (req.session.user) {
    return res.send("Already logged in");
  }

  req.session.user = foundUser;
  res.send("Successful login");
});

routes.get("/login", (req, res) => {
  if (!req.session.id) {
    return res.status(401).send("You are not logged in");
  }

  res.send(req.session);
});

routes.post("/logout", (req, res) => {
  req.session.user = undefined;
  res.send("Logged out!");
});

// module.exports = routes;
export default routes;
