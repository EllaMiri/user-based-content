import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("post", schema);
