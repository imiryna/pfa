const { Router } = require("express");
const { calcDisposableIncome, calcSavingRate, calcMaximumLoan } = require("../controllers/calculatesController");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate.protect);

router.post("/net_disposable_income", calcDisposableIncome);
router.post("/saving_rate", calcSavingRate);
router.post("/maximum_loan", calcMaximumLoan);

module.exports = router;
