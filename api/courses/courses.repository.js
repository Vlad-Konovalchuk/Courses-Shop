const courseModel = require("../../models").Course;
const { ErrorHandler } = require("../../utils/errorHandlingHelper");

const getById = async id => {
  try {
    return await courseModel.findById(id);
  } catch (error) {
    throw new ErrorHandler(404, "Course doesnt exist");
  }
};

exports.getOne = async id => {
  try {
    const course = await getById(id);
    return course;
  } catch (error) {
    throw new ErrorHandler(401, `Course doesnt exist:${error}`);
  }
};
exports.getAll = async () => {
  try {
    const all = await courseModel.findAll();
    return all;
  } catch (error) {
    throw new ErrorHandler(500, `Something went wrong:${error}`);
  }
};
exports.create = async courseContext => {
  try {
    const course = await getById(courseContext.id);
    if (!course) {
      throw new ErrorHandler(401, "Course does not exist");
    }
    return {
      course
    };
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.delete = async courseContext => {
  try {
    const course = await getById(courseContext.id);
    if (!course) {
      throw new ErrorHandler(401, "Course does not exist");
    }
    await course.destroy();
    return {
      message: "Course sucsessfuly deleted"
    };
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.update = () => {};
