const bcrypt = require("bcrypt");
const HttpError = require("../helpers/httpError");
const { getUserByEmail } = require("../services");
const { signToken } = require("../services");

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!email) return res.status(400).json({ message: "enter valid credientials" });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken({ email }, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
    const refreshToken = signToken({ email }, process.env.REFRESH_SECRET, process.env.REFRESH_EXPIRES);

    return res.status(201).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    return HttpError(401, "unauthorized");
  }
};
