const _ = require("lodash");
const coursesRepository = require("./courses.repository");
const categoryModel = require("../../models").Category;
const categoryRepository = require("../categories/categories.repositories");
const courseModel = require("../../models").Course;
const { ErrorHandler } = require("../../utils/errorHandlingHelper");

exports.getAllUsers = async (req, res) => {
  const response = await coursesRepository.getAllUsers();
  return res.json({ data: response });
};

exports.deleteCourse = async (req, res) => {
  try {
    const response = await coursesRepository.delete();
    return res.json({ data: response });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};

exports.createCourse = async (req, res) => {
  let newCourse = _.pick(req.body, [
    "title",
    "description",
    "price",
    "rating",
    "image"
  ]);
  let requestCategories = _.pick(req.body, ["categories"]).categories;
  const categories = await categoryRepository.findOrCreate(requestCategories);
  try {
    const isCourseExist = await courseModel.findOne({
      where: { title: newCourse.title }
    });
    if (isCourseExist) {
      throw new ErrorHandler(401, "Category already exist");
    }
    const course = await courseModel.create(newCourse);
    await course.setCategories(categories);
    const data = await courseModel.findOne({
      where: { id: course.id },
      include: [
        {
          model: categoryModel,
          as: "categories",
          attributes: ["title", "id"],
          through: { attributes: [] }
        }
      ]
    });
    res.status(201).json({
      data: {
        success: true,
        message: "User successfully logined",
        response: data
      }
    });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const data = await courseModel.findAll({
      include: [
        {
          model: categoryModel,
          as: "categories",
          attributes: ["title", "id"],
          through: { attributes: [] }
        }
      ]
    });
    res.status(200).json({
      data: {
        status: "OK",
        message: "All courses",
        courses: data
      }
    });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};

exports.addCategories = async (req, res) => {
  let requestCategories = _.pick(req.body, ["categories"]).categories;
  const categories = await categoryRepository.findOrCreate(requestCategories);
  try {
    const course = await courseModel.findOne({
      where: { id: req.body.courseId }
    });
    if (!course) {
      throw new ErrorHandler(401, "Course doesnt exist");
    }
    await course.addCategories(categories);
    const data = await courseModel.findOne({
      where: { id: req.body.courseId },
      include: [
        {
          model: categoryModel,
          as: "categories",
          attributes: ["title", "id"],
          through: { attributes: [] }
        }
      ]
    });
    res.status(201).json({
      data: {
        success: true,
        message: "Tags successfully added",
        response: data
      }
    });
  } catch (error) {
    throw new ErrorHandler(404, error);
  }
};
