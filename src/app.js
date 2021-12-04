// get env variables from .env file
require("dotenv").config();

const express = require("express");
const logger = require("./middlewares/logger");
const { prepareLogFile } = require("./utils/logger");

// create and prepare log file if not exists
prepareLogFile();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
// logger middleware logs all requests
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/users", require("./routes/userRoutes"));

// Not found handler
app.use(function (req, res, next) {
  res.status(404).send({ error: "Not found" });
});

// listen the server on given port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
