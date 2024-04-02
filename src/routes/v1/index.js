import express from "express";
import {} from "../../controllers/tweet-controller.js";
import TweetController from "../../controllers/tweet-controller.js";
import LikeController from "../../controllers/like-controller.js";
import commentController from "../../controllers/comment-controller.js";
import AuthController from "../../controllers/auth-controller.js";
import AuthMiddleware from "../../middlewares/authenticate.js";

const router = express.Router();

router.post("/tweets", AuthMiddleware.authenticate, TweetController.create);

router.post("/likes/toggle", LikeController.toggleLike);

router.post("/comments", commentController.createComment);

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

export default router;
