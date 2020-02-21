"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      image: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {}
  );
  Course.associate = function(models) {
    // associations can be defined here
    /*     Course.belongsToMany(models.Category, {
      through: "CourseCategories",
      as: "categories",
      foreignKey: "сourseId"
    }); */
    Course.belongsToMany(models.Category, {
      as: "categories",
      through: "CourseCategories",
      foreignKey: "courseId"
    });
  };
  return Course;
};
