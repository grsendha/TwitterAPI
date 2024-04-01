import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
  try {
    console.log(req.query.modelId, req.query.modelType, req.body.userId);
    const response = await likeService.toggleLike(
      req.query.modelId,
      req.query.modelType,
      req.body.userId
    );
    return res.status(200).json({
      data: response,
      message: "Successfully toggle like",
    });
  } catch (error) {
    return status(400).json({
      message: "Error",
      error: error,
    });
  }
};

export default { toggleLike };
