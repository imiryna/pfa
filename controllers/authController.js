const { loginUser, logoutUser, checkRefreshToken, signToken } = require("../services");

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

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const payload = await checkRefreshToken(refreshToken);

  // check DB
  if (payload.token !== refreshToken) return res.status(401).json({ message: "Invalid refresh token" });

  // generate new access token
  const newAccessToken = signToken({ email: payload.email }, process.env.JWT_SECRET, 15 * 60);
  return res.status(201).json({ accessToken: newAccessToken });
};

exports.logout = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    await logoutUser(id);
  } catch (error) {
    next(error);
  }
};
