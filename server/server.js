import express from "express";
import userRouter from "./routes/users.js";
// import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
