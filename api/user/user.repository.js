const userModel = require("../../models").User;
const { ErrorHandler } = require("../../utils/errorHandlingHelper");

const getById = id => {
  return userModel.findById(id);
};
const getByEmail = async email => {
  try {
    const data = await userModel.findOne({ where: { email } });
    return data;
  } catch (error) {
    throw new ErrorHandler(404, "User doesnt exist");
  }
};

exports.getAllUsers = async () => {
  const all = await userModel.findAll();
  return all;
};
exports.login = async userObj => {
  try {
    const user = await getByEmail(userObj.email);
    if (!user) {
      throw new ErrorHandler(401, "User does not exist");
    }
    const isPasswordValid = await user.validPassword(userObj.password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, "Credentials are incorrect");
    }
    const token = await user.generateToken();
    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    };
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.createUser = async userObj => {
  try {
    const isUserExist = await getByEmail(userObj.email);
    if (isUserExist) {
      throw new ErrorHandler(409, "User already exist");
    }
    const user = await userModel.create({
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      password: userObj.password
    });
    const token = await user.generateToken();
    if (user) {
      return {
        ...user.toJSON(),
        token
      };
    }
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.updateUser = () => {};
exports.deleteUsers = async id => {
  try {
    await userModel.destroy({
      where: { id: [id] }
    });
  } catch (error) {
    throw new ErrorHandler(500, `Something go wrong:${error}`);
  }
};
