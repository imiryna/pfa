const { loginUser, checkAccessToken, checkRefreshToken, signToken } = require("../services");

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "enter valid credientials" });
    const { user, token, refreshToken } = await loginUser(email, password);

    return res.status(201).json({ user, token, refreshToken });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  const payload = await checkRefreshToken(refreshToken);

  // check DB
  if (payload.token !== refreshToken) return res.status(401).json({ message: "Invalid refresh token" });

  // generate new access token
  const newAccessToken = signToken({ email: payload.email }, process.env.JWT_SECRET, 15 * 60);
  res.status(201).json({ accessToken: newAccessToken });

  // if (!refreshToken) return res.status(401).json({ message: "Missing token" });

  try {
    if (verifyRefresh(email, refreshToken)) {
      const newAccessToken = signToken({ email }, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
      res.status(201).json({ email: email, accessToken: newAccessToken });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await authenticateUser(email, password);

    res.status(200).json({ user, token, refreshToken });
  } catch (error) {
    next(error);
  }
};

// exports.logout = async (req, res, next) => {
//   try {
//   } catch (error) {}
// };
