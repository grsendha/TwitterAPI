import { CommentRepository, TweetRepository } from "../repositories/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async createComment(modelId, modelType, userId, content) {
    if (modelType === "Tweet") {
      var commentable = await this.tweetRepository.find(modelId);
    } else if (modelType === "Comment") {
      var commentable = await this.commentRepository.getById(modelId);
    } else {
      throw new Error("Invalid model type");
    }
    const comment = await this.commentRepository.create({
      content: content,
      userId: userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
    });
    commentable.comments.push(comment);
    await commentable.save();
    return comment;
  }
}

export default CommentService;
