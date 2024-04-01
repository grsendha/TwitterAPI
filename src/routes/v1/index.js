import express from "express";
import {} from "../../controllers/tweet-controller.js";
import TweetController from "../../controllers/tweet-controller.js";
import LikeController from "../../controllers/like-controller.js";

const router = express.Router();

router.post("/tweets", TweetController.create);

router.post("/likes/toggle", LikeController.toggleLike);

export default router;
