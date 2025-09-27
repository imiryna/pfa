const { Router } = require("express");
const { getAllTransaction, getTransactionById, createNewTransaction } = require("../controllers");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate.protect);

router.get("/", getAllTransaction);
router.get("/:id", getTransactionById);
router.post("/", createNewTransaction);

module.exports = router;
