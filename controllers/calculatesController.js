const HttpError = require("../helpers/httpError");
const { getOneUser, disposalIncome, savingRate } = require("../services");

exports.calcDisposableIncome = async (req, res) => {
  const { user_id } = req.body;
  const userId = await getOneUser(user_id);

  if (!userId) {
    return HttpError(404, "User not found");
  }
  const d = await disposalIncome(user_id);
  return res.status(201).json({ disposalIncome: d });
};

exports.calcSavingRate = async (req, res) => {
  const { user_id } = req.body;
  const userId = await getOneUser(user_id);

  if (!userId) {
    return HttpError(404, "User not found");
  }

  const rate = await savingRate(user_id);

  return res.status(201).json("saving rate", rate);
};

exports.calcMaximumLoan = async (req, res) => {
  const { user_id } = req.body;
  const userId = await getOneUser(user_id);

  if (!userId) {
    return HttpError(404, "User not found");
  }

  const dispInc = await disposalIncome(user_id);

  return res.status(201).json("maximum loan", dispInc);
};
