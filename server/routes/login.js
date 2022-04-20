// import express from "express";
// import cookieSession from "cookie-session";

// const routes = express.Router();
// const app = express();

// app.use(express.json());

// routes.post("/login", async (req, res) => {
//   const user = users.find((user) => user.name === req.body.name);
//   if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//     return res.status(401).send("Wrong password or username");
//   }

//   if (req.session.id) {
//     return res.send("Already logged in");
//   }

//   req.session.id = uuid.v4();
//   req.session.username = user.name;
//   req.session.loginDate = new Date();
//   // req.session.role = undefined;
//   res.send("Successful login");
// });
