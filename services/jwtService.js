// const jwt = require("jsonwebtoken");

const HttpError = require("../helpers/httpError");
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

  const expires = Math.floor(Date.now() / 1000) + Number(lifeTime);

  // Generating payload
  const body = { ...data, expires };

  // converts the Header
  const headerBase64 = toBase64Encode(header);
  // converts the payload
  const bodyBase64 = toBase64Encode(body);

  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  const signature = crypto.createHmac("sha256", secret).update(`${headerBase64}.${bodyBase64}`).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${headerBase64}.${bodyBase64}.${signature}`;
};

const verify = (token, secret) => {
  const [headerB, bodyB, signature] = token.split(".");

  //decoder {header} {payload}
  // const headerDecod = JSON.parse(atob(headerB));
  // const bodyDecod = JSON.parse(atob(bodyB));
  const bodyDecod = JSON.parse(Buffer.from(bodyB, "base64").toString("utf8"));

  // Check if token has expired
  if (bodyDecod.expires) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (bodyDecod.expires < currentTime) {
      throw new HttpError(403, "Token expired");
    }
  }

  //We re-sign {header} {payload} with the same secret.
  const checkSig = crypto.createHmac("sha256", secret).update(`${headerB}.${bodyB}`).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  // Compare checkSig with the signature in the token.
  if (checkSig !== signature) throw new HttpError(403, "Invalid signature");

  return bodyDecod;
};

//checkToken
exports.checkToken = (token) => {
  try {
    const { id } = verify(token, process.env.JWT_SECRET);

    return id;
  } catch (error) {
    throw new HttpError(401, error.message);
  }
};

//verifyRefresh of token
exports.verifyRefresh = (id, token) => {
  try {
    const decoded = verify(token, process.env.REFRESH_SECRET);

    if (decoded.id !== id) {
      throw new HttpError(403, "Token does not match user");
    }

    return decoded.id === id;
  } catch (error) {
    throw new HttpError(401, error.message);
  }
};
