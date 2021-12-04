const jwt = require("jsonwebtoken");

const {
  insertUser,
  findUserById,
  deleteUserById,
  updateUserById,
  comparePassword,
  findUserByEmail,
} = require("../repository/User");

const createUserController = (req, res) => {
  const { name, email, password } = req.body;

  // TODO: Validate user data before inserting
  const user = insertUser({ name, email, password });

  res.status(201).send({ user });
};

const loginUserController = (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  if (!comparePassword(password, user.password)) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.status(200).send({ token });
};

const getUserController = (req, res) => {
  const id = req.payload.id;
  const user = findUserById(id);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.status(200).send({ user });
};

const deleteUserController = (req, res) => {
  const id = req.payload.id;
  deleteUserById(id);

  // It doesn't matter if the user was deleted or
  // not exist in the first place we send empty body
  // with 204 (No Content) status code
  res.status(204).send();
};

const updateUserController = (req, res) => {
  const id = req.payload.id;
  const user = req.body;

  // TODO: Validate user data before updating
  const updatedUser = updateUserById(id, user);

  if (!updatedUser) {
    return res.status(404).send({ error: "User not found" });
  }

  res.status(200).send({ user: updatedUser });
};

module.exports = {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserController,
  loginUserController,
};
