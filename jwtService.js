// const jwt = require("jsonwebtoken");

const HttpError = require("./helpers/httpError");
const crypto = require("crypto");

// Convert a string to Base64
const toBase64Encode = (input) => {
  // converts the obj {data} to a string
  const string = JSON.stringify(input);

  // we are using Node-native Buffer obj, and return string converted to base64
  return Buffer.from(string).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

exports.signToken = (data, secret, lifeTime) => {
  // suppose we have this header
  const header = { alg: "HS256", typ: "JWT" };

  const expires = Math.floor(Date.now() / 1000) + lifeTime;

  // Generating payload
  const body = { ...data, expires };

  // converts the Header
  const headerBase64 = toBase64Encode(JSON.stringify(header));
  // converts the payload
  const bodyBase64 = toBase64Encode(JSON.stringify(body));

  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  const signature = crypto.createHmac("sha256", secret).update(`${headerBase64}.${bodyBase64}`).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${headerBase64}.${bodyBase64}.${signature}`;
};

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
