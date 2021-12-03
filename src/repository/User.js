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

const deleteUserById = (id) => {
  users.splice(
    users.findIndex((user) => user.id === id),
    1
  );
};

const updateUserByID = (id, updatedUser) => {
  const user = findUserById(id);
  if (user) {
    user.name = updatedUser.name || user.name;
    user.email = updatedUser.email || user.email;
    user.password = hashPassword(updatedUser.password) || user.password;
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

module.exports = {
  insertUser,
  findUserById,
  deleteUserById,
  updateUserByID,
  comparePassword,
};
