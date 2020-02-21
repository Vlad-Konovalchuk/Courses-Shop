const express = require("express");
const router = express.Router();
const controller = require("./courses.controller");
const validation = require("../../middlewares/requestValidation");
const userValidateSchema = require("./courses.validation");
/* GET users listing. */
router.get("/courses", controller.getAllCourses);
/* User registration */
router.post("/courses", controller.createCourse);
/* User registration */
router.post("/courses/add-category", controller.addCategories);
module.exports = router;
