import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    const response = await commentService.createComment(
      req.query.modelId,
      req.query.modelType,
      req.body.userId,
      req.body.content
    );
    return res.status(200).json({
      data: response,
      message: "Successfully toggle Comment",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error: error,
    });
  }
};

export default { createComment };
