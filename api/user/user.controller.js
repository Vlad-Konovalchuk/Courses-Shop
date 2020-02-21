const userRepository = require("./user.repository");
const { ErrorHandler } = require("../../utils/errorHandlingHelper");
exports.getAllUsers = async (req, res) => {
  const response = await userRepository.getAllUsers();
  return res.json({ data: response });
};
exports.deleteUsers = async (req, res) => {
  try {
    const response = await userRepository.deleteUsers();
    return res.json({ data: response });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};
exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const response = await userRepository.login(user);
    console.log(response);
    res.status(201).json({
      data: {
        success: true,
        message: "User successfully logined",
        response
      }
    });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};
exports.register = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  try {
    const response = await userRepository.createUser(user);
    console.log(response);
    res.status(201).json({
      data: {
        message: "User successfully created",
        user: response
      }
    });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};
exports.passwordReset = () => {
  return ["Vlad"];
};
exports.updateUser = () => {
  return ["Vlad"];
};
