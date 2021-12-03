const express = require("express");
const {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserController,
} = require("../controllers/users");

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", getUserController);
router.delete("/:id", deleteUserController);
router.patch("/:id", updateUserController);

module.exports = router;
