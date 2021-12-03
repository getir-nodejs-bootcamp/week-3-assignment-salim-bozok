const {
  insertUser,
  findUserById,
  deleteUserById,
} = require("../repository/User");

const createUserController = (req, res) => {
  const { name, email, password } = req.body;
  const user = insertUser({ name, email, password });

  res.status(201).send({ user });
};

const getUserController = (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ user });
};

const deleteUserController = (req, res) => {
  const { id } = req.params;
  deleteUserById(id);

  // It doesn't matter if the user was deleted or not exist
  // in the first place we send empty body
  // with 204 (No Content) status code
  res.status(204).send();
};

const updateUserController = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updatedUser = updateUserById(id, user);

  if (!updatedUser) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ user: updatedUser });
};

module.exports = {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserController,
};
