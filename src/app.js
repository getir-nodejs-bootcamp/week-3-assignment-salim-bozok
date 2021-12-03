require("dotenv").config();

const express = require("express");

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
