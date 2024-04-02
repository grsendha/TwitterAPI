import express from "express";
import { PORT } from "./config/serverConfig.js";
import bodyParser from "body-parser";
import { connectDB } from "./database/databaseConnectivity.js";

import TweetService from "./services/tweet-service.js";
import { DEBUG } from "./utils/print.js";
import apiRoutes from "./routes/index.js";
import { TweetRepository, UserRepository } from "./repositories/index.js";
import LikeService from "./services/like-service.js";
import passport from "passport";
import { passportAuth } from "./middlewares/jwt-middleware.js";

const app = express();

const serverSetup = async () => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.use(passport.initialize());
  passportAuth(passport);

  await connectDB().then(async () => {
    const userRepo = new UserRepository();
    // const usere = await userRepo.create({
    //   email: "1234@gmail.com",
    //   password: "123",
    //   name: "Gyan",
    // });
    // const user = usere;
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getAllTweets(0, 10);
    // console.log(tweet);
    const likeService = new LikeService();
    likeService.toggleLike(tweet[0].id, "Tweet", "66096fca960b7dbe3325dd7d");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

serverSetup();
