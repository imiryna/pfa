const { getAllAccounts, getAccountById, createNewAccount, updateAccount, deleteAccount } = require("../controllers");
const { Router } = require("express");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate.protect);

router.get("/", getAllAccounts);
router.get("/:id", getAccountById);
router.post("/", createNewAccount);
router.post("/:id", updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router;
