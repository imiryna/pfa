const { signToken, checkToken, verifyRefresh } = require("../services/jwtService");

exports.authMiddleware = (req, res, next) => {
  const rawToken = req.headers.authorization;

  if (!rawToken) return res.status(401).json("unauthorized");
  const token = rawToken.split(" ")[1];

  //verify of token
  try {
    checkToken(token);
  } catch (e) {
    return res.status(e.status).json({ message: e.message });
  }
  next();
};
