import { UserRepository } from "../repositories/index.js";

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.UserRepository.create(data);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
