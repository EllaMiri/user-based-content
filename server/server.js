import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use("/", userRouter);
app.use("/", postRouter);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
