const { getAllBudgets, getBudgetById, createNewBudget, updateBudget, deleteBudgetById } = require("../controllers");
const { Router } = require("express");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate.protect);

router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.post("/", createNewBudget);
router.post("/:id", updateBudget);
router.delete("/:id", deleteBudgetById);

module.exports = router;
