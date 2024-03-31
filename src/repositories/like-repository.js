import Like from "../models/like.js";

import CrudRepository from "./crud-repository.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  async findByUserAndLikeable(data) {
    try {
      const like = await Like.findOne(data);
      return like;
    } catch {
      throw new Error(error);
    }
  }

  async find(id) {
    try {
      const tweet = await Tweet.findById(id).populate({ path: "likes" });
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}
export default LikeRepository;
