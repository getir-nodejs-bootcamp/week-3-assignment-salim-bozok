// get env variables from .env file
require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.use("/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
