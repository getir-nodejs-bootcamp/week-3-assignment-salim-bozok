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
router.post("/auth", loginUserController);
router.get("/", auth, getUserController);
router.delete("/", auth, deleteUserController);
router.patch("/", auth, updateUserController);

module.exports = router;
