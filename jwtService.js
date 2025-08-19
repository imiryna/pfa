const jwt = require("jsonwebtoken");

const HttpError = require("./helpers/httpError");

exports.signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

exports.checkToken = (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (error) {
    throw new HttpError(401, error.message);
  }
};

exports.verifyRefresh = (id, token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    return decoded.id === id;
  } catch (error) {
    throw new HttpError(401, error.message);
  }
};
