import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();
const create = async (req, res) => {
  try {
    const response = await tweetService.create(req.body);
    return res.status(201).json({
      message: "Tweet created successfully",
      data: response,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default { create };
