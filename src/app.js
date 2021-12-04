// get env variables from .env file
require("dotenv").config();

const express = require("express");
const logger = require("./middlewares/logger");
const { prepareLogFile } = require("./utils/logger");

prepareLogFile();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.use("/users", require("./routes/userRoutes"));

app.use(function (req, res, next) {
  res.status(404).send({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
