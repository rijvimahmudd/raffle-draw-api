require("dotenv").config("../.env");
const express = require("express");
const app = express();
const middleware = require("./middleware");
const { notFoundMiddleware, errorHandlerMiddleware } = require("./error");

app.use(middleware);
app.use(require("./routes"));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
