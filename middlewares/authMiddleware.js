const { checkAccessToken } = require("../services");

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
