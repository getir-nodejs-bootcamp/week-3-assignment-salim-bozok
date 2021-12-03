const express = require("express");
const {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserController,
  loginUserController,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", createUserController);
router.get("/login", loginUserController);
router.get("/:id", auth, getUserController);
router.delete("/:id", auth, deleteUserController);
router.patch("/:id", auth, updateUserController);

module.exports = router;
