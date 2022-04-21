import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import cookieSession from "cookie-session";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());

app.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 1000 * 10,
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
