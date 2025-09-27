const { Router } = require("express");
const { calcDisposableIncome, calcSavingRate, calcMaximumLoan } = require("../controllers/calculatesController");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate);

router.get("/net_disposable_income", calcDisposableIncome);
router.get("/saving_rate", calcSavingRate);
router.get("/maximum_loan", calcMaximumLoan);

module.exports = router;
