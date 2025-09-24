const { Router } = require("express");
const { getAllTransaction, getTransactionById, createNewTransaction } = require("../controllers");

const router = Router();

router.get("/", getAllTransaction);
router.get("/:id", getTransactionById);
router.post("/", createNewTransaction);

module.exports = router;
