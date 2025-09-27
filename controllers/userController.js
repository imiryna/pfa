const bcrypt = require("bcrypt");
const HttpError = require("../helpers/httpError");

const { getUsers, getOneUser, createUser, updateUserInDb } = require("../services/usersService");

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await getUsers();
    // console.log(result);

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneUser(id);

    if (!result) {
      return HttpError(404, "User not found");
    }

    return res.status(200).json(results.rows);
  } catch (er) {
    next(er);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { password, ...restUserData } = req.body;

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    // console.log(passwordValidate);

    const result = await createUser({
      password: passwordHash,
      ...restUserData,
    });
    const newUser = result.rows.pop();
    newUser.password = undefined;

    res.status(201).json({
      msg: "Success",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// update

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    updateUserInDb(id, name, email);

    res.status(200).json(`User modified with ID: ${id}`);
  } catch (er) {
    next(er);
  }
};

// delete
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getOneUser(id);

    if (!result) {
      return HttpError(404, "User not found");
    }

    deleteUserById(id);

    res.status(200).json(`User deleted with ID: ${id}`);
  } catch (error) {
    next(error);
  }
};
