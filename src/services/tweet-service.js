import { TweetRepository, HashTagRepository } from "../repositories/index.js";
console.log("TweetRepository", TweetRepository);
console.log("Hashtag", HashTagRepository);
import { DEBUG } from "../utils/print.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashTagRepository();
  }

  /**
   * Creates a new tweet.
   *
   * @param {Object} data - The data for the tweet.
   * @param {string} data.content - The content of the tweet.
   * @returns {Promise<Object>} - A promise that resolves to the created tweet.
   */
  async create(data) {
    const content = data.content;
    const tags = content.match(/#\w+/g).map((tag) => tag.slice(1));

    DEBUG("tweet tags are ", tags);

    const tweet = await this.tweetRepository.createTweet(data);
    let alreadyPresentTagsResult = await this.hashtagRepository.findByName(
      tags
    );
    const titleOfPresentTags = alreadyPresentTagsResult.map((tag) => tag.title);

    DEBUG("already present tags:", titleOfPresentTags);

    let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));
    DEBUG("new tags are ", newTags);
    newTags = newTags.map((tag) => ({ title: tag, tweetId: [tweet.id] }));

    DEBUG("processed tags are ", newTags);

    const createdTags = await this.hashtagRepository.bulkCreateHashTags(
      newTags
    );

    alreadyPresentTagsResult.forEach((tag) => {
      tag.tweetId.push(tweet.id);
      tag.save();
    });

    return tweet;
  }

  async getAllTweets() {
    return this.tweets;
  }

  addTweet(tweet) {
    this.tweets.push(tweet);
  }
}

export default TweetService;
