import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
  async createTweet(tweet) {
    try {
      const newTweet = await Tweet.create(tweet);
      return newTweet;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTweets(offset, limit) {
    try {
      return await Tweet.find().skip(offset).limit(limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTweet(tweetId) {
    try {
      return await Tweet.findByIdAndDelete(tweetId);
    } catch (error) {
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

export default TweetRepository;
