import express from "express";
import { PORT } from "./config/serverConfig.js";
import bodyParser from "body-parser";
import { connectDB } from "./database/databaseConnectivity.js";

import TweetService from "./services/tweet-service.js";
import { DEBUG } from "./utils/print.js";

const app = express();

const serverSetup = async () => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await connectDB().then(async () => {
    let tweetService = new TweetService();
    const tweet = await tweetService.create({
      content: "i m using #express and #super",
    });
    DEBUG("tweet is ", tweet);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

serverSetup();
