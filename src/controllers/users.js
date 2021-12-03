const {
  insertUser,
  findUserById,
  deleteUserById,
  comparePassword,
} = require("../repository/User");

const createUserController = (req, res) => {
  const { name, email, password } = req.body;
  const user = insertUser({ name, email, password });

  // we dont want to send the password back to the client
  delete user.password;

  res.status(201).send({ user });
};

const loginUserController = (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  if (comparePassword(password, user.password)) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.status(200).send({ token });
};

const getUserController = (req, res) => {
  const id = req.userID;
  const user = findUserById(id);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ user });
};

const deleteUserController = (req, res) => {
  const id = req.userID;
  deleteUserById(id);

  // It doesn't matter if the user was deleted or
  // not exist in the first place we send empty body
  // with 204 (No Content) status code
  res.status(204).send();
};

const updateUserController = (req, res) => {
  const id = req.userID;
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
  loginUserController,
};
