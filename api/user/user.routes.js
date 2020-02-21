const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const validation = require("../../middlewares/requestValidation");
const userValidateSchema = require("./user.validation");
/* GET users listing. */
router.get("/users-info", controller.getAllUsers);
router.get("/users-delete", controller.deleteUsers);
/* User registration */
router.post(
  "/register",
  validation(userValidateSchema.registerValidateSchema),
  controller.register
);
/* User login */
router.post(
  "/login",
  validation(userValidateSchema.loginValidateSchema),
  controller.login
);

module.exports = router;
