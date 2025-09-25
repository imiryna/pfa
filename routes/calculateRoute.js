const { Router } = require("express");
const { calcDisposableIncome, calcSavingRate, calcMaximumLoan } = require("../controllers/calculatesController");

const router = Router();

router.post("/net_disposable_income", calcDisposableIncome);
router.post("/saving_rate", calcSavingRate);
router.post("/maximum_loan", calcMaximumLoan);

module.exports = router;
