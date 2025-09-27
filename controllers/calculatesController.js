const HttpError = require("../helpers/httpError");
const { getOneUser, disposalIncome, savingRate } = require("../services");

exports.calcDisposableIncome = async (req, res) => {
  const d = await disposalIncome(req.currentUser.id);
  return res.status(201).json({ disposalIncome: d });
};

exports.calcSavingRate = async (req, res) => {
  const rate = await savingRate(req.currentUser.id);

  return res.status(201).json({ "saving rate": rate });
};

exports.calcMaximumLoan = async (req, res) => {
  const dispInc = await disposalIncome(req.currentUser.id);

  return res.status(201).json("maximum loan", dispInc);
};
