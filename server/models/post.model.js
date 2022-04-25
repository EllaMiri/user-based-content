import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String },
    text: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("post", schema);
