const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// All Feature
const userRouter = require("./services/user/user.router");
const apiKeyMiddleware = require("./middlewares/api_key_middleware");

const mainApp = express();
mainApp.use(userRouter, apiKeyMiddleware);

mainApp.use(cors(), helmet(), morgan("tiny"));

//use handle error
mainApp.use(function (_req, res, next) {
  res.status(404).send("Unable to find the requested resource!");
});

module.exports = mainApp;
