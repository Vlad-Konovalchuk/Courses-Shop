"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {}
  );
  Category.associate = function(models) {
    /*   Category.belongsToMany(models.Course, {
      through: "CourseCategories",
      foreignKey: "categoryId"
    }); */
    Category.belongsToMany(models.Course, {
      through: "CourseCategories",
      foreignKey: "categoryId"
    });
  };
  return Category;
};
