const { checkAccessToken } = require("../services");
const authValidation = require("./schemas/validateAuth");
const HttpError = require("../helpers/httpError");

exports.authentificate = async (req, res, next) => {
  const rawToken = req.headers.authorization;

  if (!rawToken) return res.status(401).json("unauthorized");
  const token = rawToken.split(" ")[1];

  //verify of token
  try {
    const currentUser = await checkAccessToken(token);
    req.currentUser = currentUser;
  } catch (e) {
    return res.status(e.status).json({ message: e.message });
  }
  next();
};

exports.checkSignupData = async (req, res, next) => {
  const { value, error } = authValidation.signUpSchema.validate(req.body);

  if (error) {
    throw new HttpError(400, "Invalid user data..", error);
  }

  req.body = value;

  next();
};
