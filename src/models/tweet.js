import mongoose from "mongoose";

// Define the tweet schema
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [280, "Tweet is too long make it under 280 characters"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// Create the Tweet model
const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
