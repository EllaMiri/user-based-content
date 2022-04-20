import express from "express";
import { v4 as uuidv4 } from "uuid";

const routes = express.Router();
const app = express();

app.use(express.json());

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

routes.post("/users", (req, res) => {
  const user = req.body;
  res.status(201);
  res.send("User created!");
  users.push({ ...user, id: uuidv4() });
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

// module.exports = routes;
export default routes;
