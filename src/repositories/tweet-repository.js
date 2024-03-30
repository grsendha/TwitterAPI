const Tweet = require("../models/tweet");

class TweetRepository {
  async createTweet(tweet) {
    try {
      const newTweet = await Tweet.create(tweet);
      return newTweet;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTweets() {
    try {
      return await Tweet.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTweetById(tweetId) {
    try {
      return await Tweet.findById(tweetId);
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
}

module.exports = TweetRepository;
