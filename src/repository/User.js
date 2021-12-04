const bcrypt = require("bcryptjs");
const validator = require("validator");

// we keep the users in memory
const users = [];

const insertUser = (user) => {
  // set the user id in an auto incrementing way
  user.id = users.length + 1;
  // hash the password for security reasons
  user.password = hashPassword(user.password);

  users.push(user);

  return user;
};

// findUserById returns the user with the given id
// if the user doesn't exist, return undifined
const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const deleteUserById = (id) => {
  users.splice(
    users.findIndex((user) => user.id === id),
    1
  );
};

const updateUserById = (id, updatedUser) => {
  const user = findUserById(id);
  if (user) {
    user.name = updatedUser.name || user.name;
    user.email = updatedUser.email || user.email;
  }

  if (updatedUser.password) {
    user.password = hashPassword(updatedUser.password);
  }

  return user;
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// comparePassword comperes the plaintext password
// with the hashed password in the database
// if they match, return true
// if they don't match, return false
const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const validateUserInput = (user, isNew) => {
  let errors = [];

  if (!user.email) {
    // When updating a user, the email is not required
    if (isNew) {
      errors.push({ email: "Email is required" });
    }
  } else if (!validator.isEmail(user.email)) {
    errors.push({ email: "Email is invalid" });
  }

  if (!user.password) {
    // When updating a user, the password is not required
    if (isNew) {
      errors.push({ password: "Password is required" });
    }
  } else if (user.password.length < 8) {
    errors.push({ password: "Password must be at least 8 characters" });
  }

  if (!user.name) {
    // When updating a user, the name is not required
    if (isNew) {
      errors.push({ name: "Name is required" });
    }
  } else if (user.name.length < 3) {
    errors.push({ name: "Name must be at least 3 characters" });
  }

  return errors;
};

module.exports = {
  insertUser,
  findUserById,
  findUserByEmail,
  deleteUserById,
  updateUserById,
  comparePassword,
  validateUserInput,
};
