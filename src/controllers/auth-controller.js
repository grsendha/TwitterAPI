import UserService from "../services/user-service.js";

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(200).json({
      data: response,
      message: "Successfully created user",
    });
  } catch (error) {
    return res.status(500).json({
      data: response,
      message: "Failed created user",
    });
  }
};

export default { signup };
