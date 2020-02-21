require("dotenv").config();
const express = require("express");
const compression = require("compression");
const logger = require("morgan");
const cors = require("cors");
//const helmet = require("helmet");
const { handleError } = require("./utils/errorHandlingHelper");
const db = require("./models");
const userRoute = require("./api/user/user.routes");
const categoriesRoute = require("./api/categories/categories.routes");
const coursesRoute = require("./api/courses/courses.routes");

const app = express();

/* Basic middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(helmet()); */
app.use(cors());
app.use(compression());
app.use(logger("dev"));

/* End Basic middlewares */

/* Routes */
app.use("/auth", userRoute);
app.use("/api", coursesRoute);
/* End Routes */

/* Error Handling */
app.use((err, req, res, next) => {
  handleError(err, res);
  /* Example of using: throw new ErrorHandler(500, "Some is bad"); */
});
/* Error Handling */

async function run() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    app.listen(3000, () => console.log("Server is listening"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

run();
