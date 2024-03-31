import { LikeRepository, TweetRepository } from "../repositories/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (modelType === "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
      console.log("LIKABLE", likeable);
    } else if (modelType === "Comment") {
    } else {
      throw new Error("Invalid model type");
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    console.log(exists);

    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      var isAdded = true;
    }
    return isAdded;
  }

  async createLike(like) {
    try {
      return await this.likeRepository.create(like);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLikes() {
    try {
      return await this.likeRepository.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteLike(likeId) {
    try {
      return await this.likeRepository.delete(likeId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default LikeService;
