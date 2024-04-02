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

const login = async (req, res) => {
  try {
    const token = await userService.signin(req.body);
    return res.status(200).json({
      message: "Successfully logged in",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to log in",
      success: false,
    });
  }
};

export default { signup, login };
