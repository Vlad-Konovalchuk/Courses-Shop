"use strict";
const { comparePassword, hashPassword } = require("../utils/hashingHelper");
const jwt = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate(async (user, options) => {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    } catch (error) {
      throw new Error(`Something bad with hash:${error}`);
    }
  });
  User.prototype.generateToken = async function() {
    try {
      const t = await jwt.sign(
        { id: this.id, emal: this.email },
        "SECRET_KEY",
        {
          expiresIn: "24h"
        }
      );
      return t;
    } catch (error) {
      throw new ErrorHandler(500, "Token is bad");
    }
  };
  User.prototype.isPasswordValid = async function(password) {
    try {
      const isValid = await comparePassword(password, this.password);
      return isValid;
    } catch (error) {
      throw new Error(`Cannot compare passwords:${error}`);
    }
  };
  return User;
};
