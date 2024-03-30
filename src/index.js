const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const { connectDB } = require("./database/databaseConnectivity");
const HashTagRepository = require("./repositories/hashtag-repository");
const TweetService = require("./services/tweet-service");
const { DEBUG } = require("./utils/print");
const app = express();

const serverSetup = async () => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await connectDB().then(async () => {
    let repo = new HashTagRepository();
    // await repo.bulkCreateHashTags([
    //   { title: "nodejs", tweetId: [] },
    //   { title: "express", tweetId: [] },
    //   { title: "mongodb", tweetId: [] },
    // ]);
    let tweetService = new TweetService();
    const tweet = await tweetService.create({
      content: "i m using #express",
    });
    DEBUG("tweet is ", tweet);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
};

serverSetup();
