const Hashtag = require("../models/hashtag");

class HashTagRepository {
  constructor() {}

  async createHashTag(tag) {
    try {
      const newTag = await Hashtag.create(tag);
      return newTag;
    } catch (error) {
      throw new Error(error);
    }
  }

  async bulkCreateHashTags(data) {
    try {
      const createdTags = await Hashtag.insertMany(data);
      return createdTags;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getHashtag(tagId) {
    try {
      return await Hashtag.findById(tagId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteHashTag(tagId) {
    try {
      return await Hashtag.findByIdAndDelete(tagId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByName(titleList) {
    try {
      return await Hashtag.find({
        title: titleList,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = HashTagRepository;
