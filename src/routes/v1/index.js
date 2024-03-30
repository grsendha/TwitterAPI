import express from "express";
import {} from "../../controllers/tweet-controller.js";
import TweetController from "../../controllers/tweet-controller.js";

const router = express.Router();

router.post("/tweets", TweetController.create);

export default router;
