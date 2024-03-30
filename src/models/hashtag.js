import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    tweetId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);
export default Hashtag;
