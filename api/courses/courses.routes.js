const express = require("express");
const router = express.Router();
const controller = require("./courses.controller");
const authChek = require("../../middlewares/authTokenValidation");
const validation = require("../../middlewares/requestValidation");
const userValidateSchema = require("./courses.validation");
/* GET users listing. */
router.get("/courses", authChek, controller.getAllCourses);
/* User registration */
router.post("/courses", authChek, controller.createCourse);
/* User registration */
router.post("/courses/add-category", controller.addCategories);
module.exports = router;
