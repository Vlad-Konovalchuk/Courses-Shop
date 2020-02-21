const categoriesModel = require("../../models").Category;
const { ErrorHandler } = require("../../utils/errorHandlingHelper");

const getById = async id => {
  try {
    return await categoriesModel.findById(id);
  } catch (error) {
    throw new ErrorHandler(404, "Course doesnt exist");
  }
};

exports.getOne = async id => {
  try {
    const category = await getById(id);
    return category;
  } catch (error) {
    throw new ErrorHandler(401, `Category doesnt exist:${error}`);
  }
};
exports.getAll = async () => {
  try {
    const all = await categoriesModel.findAll();
    return all;
  } catch (error) {
    throw new ErrorHandler(500, `Something went wrong:${error}`);
  }
};
exports.findOrCreate = async categoriesList => {
  try {
    let newCategories = [];
    for (let catg of categoriesList) {
      console.log(catg.title);
      const data = await categoriesModel
        .findOrCreate({
          where: { title: catg.title },
          defaults: { title: catg.title }
        })
        .spread(category => category);
      newCategories.push(data);
    }
    return newCategories;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.delete = async id => {
  try {
    const category = await getById(id);
    if (!category) {
      throw new ErrorHandler(401, "Category does not exist");
    }
    await category.destroy();
    return {
      message: "Category sucsessfuly deleted"
    };
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};
exports.update = () => {};
