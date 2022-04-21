import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session";

const routes = express.Router();

let users = [
  {
    username: "Anna",
    password: "hund",
    id: uuidv4(),
  },
];

routes.get("/users", (req, res) => {
  console.log(users);
  res.status(200);
  res.json(users);
});

routes.post("/users", async (req, res) => {
  if (users.find((user) => user.username === req.body.username)) {
    return res.status(409).send("Username already exists");
  }

  // Otherwise hash password and save
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  users.push({
    username: req.body.username,
    password: hashedPassword,
    id: uuidv4(),
  });
  res.status(201).send("User created");
});

routes.put("/users/:id", (req, res) => {
  const userId = req.body.id;
  const { username, password } = req.body;

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404);
    res.send("There is no user with that ID to update.");
  } else {
    users = users.map(function (user) {
      if (user.id === userId) {
        return {
          username,
          password,
          id: user.id,
        };
      }
      return user;
    });
    res.status(200);
    res.send("User updated!");
  }
});

routes.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => user.id === id);

  if (findUser === undefined) {
    return res.status(404).send("Not found!");
  }
  if (findUser) {
    return res.send(findUser);
  }
});

routes.delete("/users/:id", (req, res) => {
  //   const { id } = req.params;
  //   users = users.filter((users) => users.id !== id);

  //   res.send(`User with ${id} has been deleted`);
  const userId = req.params.id;

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404);
    res.send("There is no user with that ID to delete.");
  } else {
    users = users.filter(function (user) {
      return user.id !== userId;
    });
    res.status(200);
    res.send("User deleted!");
  }
});

routes.post("/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send("Wrong password or username");
  }

  if (req.session.id) {
    return res.send("Already logged in");
  }
  req.session.id = uuidv4();
  req.session.username = user.username;
  req.session.loginDate = new Date();
  req.session.role = undefined;
  res.send("Successful login");
});

routes.get("/login", (req, res) => {
  // Check if we are authorized (e.g logged in)
  if (!req.session.id) {
    return res.status(401).send("You are not logged in");
  }
  // Send info about the session (a cookie stored on the clinet)
  res.send(req.session);
});

// module.exports = routes;
export default routes;
