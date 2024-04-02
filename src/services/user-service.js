import { UserRepository } from "../repositories/index.js";
import User from "../models/user.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signin(data) {
    try {
      console.log(data.email);
      const user = await this.userRepository.findBy({ email: data.email });
      console.log(user);
      if (!user) {
        throw {
          message: "User not found",
        };
      }

      if (!user.comparePassword(data.password)) {
        throw {
          message: "Incorrect Password",
        };
      }
      const token = user.generateToken();

      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email: email });
      return user;
    } catch (error) {}
  }
}

export default UserService;
