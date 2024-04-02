import { TweetRepository, HashTagRepository } from "../repositories/index.js";

import { DEBUG } from "../utils/print.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashTagRepository();
  }

  #filterTagWhichIsNotPresent(tags, titleArrayOfPresentTags, tweet) {
    let newTags = tags.filter((tag) => !titleArrayOfPresentTags.includes(tag));
    newTags = newTags.map((tag) => {
      return { title: tag, tweetId: [tweet.id] };
    });
    return newTags;
  }

  async #findingAlreadyPresentTags(tags) {
    let alreadyPresentTagsResult = await this.hashtagRepository.findByName(
      tags
    );

    const titleArrayOfPresentTags = alreadyPresentTagsResult.map(
      (tag) => tag.title
    );
    return { titleArrayOfPresentTags, alreadyPresentTagsResult };
  }

  #filteringHashTag(data) {
    const content = data.content;
    const tags =
      content
        .match(/#\w+/g)
        ?.map((tag) => tag.slice(1))
        ?.map((tag) => tag.toLowerCase()) || [];
    return tags;
  }
  #pushingTweetToTheirHashtag(alreadyPresentTagsResult, tweet) {
    alreadyPresentTagsResult.forEach((tag) => {
      tag.tweetId.push(tweet.id);
      tag.save();
    });
  }

  /**
   * Creates a new tweet.
   *
   * @param {Object} data - The data for the tweet.
   * @param {string} data.content - The content of the tweet.
   * @returns {Promise<Object>} - A promise that resolves to the created tweet.
   */
  async create(data) {
    const tags = this.#filteringHashTag(data);
    const tweet = await this.tweetRepository.createTweet(data);
    if (tags) {
      const { titleArrayOfPresentTags, alreadyPresentTagsResult } =
        await this.#findingAlreadyPresentTags(tags);
      const newTags = this.#filterTagWhichIsNotPresent(
        tags,
        titleArrayOfPresentTags,
        tweet
      );
      await this.hashtagRepository.bulkCreateHashTags(newTags);
      this.#pushingTweetToTheirHashtag(alreadyPresentTagsResult, tweet);
    }
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
