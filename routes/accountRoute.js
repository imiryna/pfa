const { getAllAccounts, getAccountById, createNewAccount, updateAccount, deleteAccount } = require("../controllers");
const { Router } = require("express");
const { authentificate, checkAddAccount, checkUpdateAccount } = require("../middlewares");

const router = Router();

router.use(authentificate);

router.get("/", getAllAccounts);
router.get("/:id", getAccountById);
router.post("/", checkAddAccount, createNewAccount);
router.patch("/:id", checkUpdateAccount, updateAccount);
router.delete("/:id", deleteAccount);

module.exports = router;
