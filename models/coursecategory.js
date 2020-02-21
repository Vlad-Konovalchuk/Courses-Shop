"use strict";
module.exports = (sequelize, DataTypes) => {
  const CourseCategory = sequelize.define(
    "CourseCategory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.INTEGER(11),
        primaryKey: true
      },
      coursedId: {
        type: DataTypes.INTEGER(11),
        primaryKey: false,
        references: {
          model: "Courses",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-category-per-course"
      },
      categoryId: {
        type: DataTypes.INTEGER(11),
        primaryKey: false,
        references: {
          model: "Categories",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-category-per-course"
      }
    },
    {}
  );
  CourseCategory.associate = function(models) {
    CourseCategory.belongsTo(models.Course, {
      foreignKey: "coursedId",
      targetKey: "id",
      as: "Course"
    });
    CourseCategory.belongsTo(models.Category, {
      foreignKey: "categoryId",
      targetKey: "id",
      as: "Category"
    });
  };
  return CourseCategory;
};
