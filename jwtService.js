// const jwt = require("jsonwebtoken");

const HttpError = require("./helpers/httpError");

// Convert a string to Base64
const toBase64 = (data) => {
  // converts the obj {data} to a string
  const string = JSON.stringify(data);

  // we are using Node-native Buffer obj. We return string converted to base64
  return Buffer.from(string).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

exports.signToken = (data, secret, lifeTime) => jwt.sign(data, secret, { expiresIn: lifeTime });

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

    if (decoded.id !== id) {
      throw new HttpError(403, "Token does not match user");
    }

    return decoded.id === id;
  } catch (error) {
    throw new HttpError(401, error.message);
  }
};
