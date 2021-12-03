const express = require("express");
const {
  deleteUserByIdController,
  findUserByIdController,
  createUserController,
  updateUserByIDController,
} = require("../controllers/users");

const router = express.Router();

router.post("/", createUserController);
router.get("/:id", findUserByIdController);
router.delete("/:id", deleteUserByIdController);
router.patch("/:id", updateUserByIDController);

module.exports = router;
