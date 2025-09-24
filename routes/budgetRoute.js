const { getAllBudgets, getBudgetById, createNewBudget, updateBudget, deleteBudgetById } = require("../controllers");
const { Router } = require("express");

const router = Router();

router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.post("/", createNewBudget);
router.post("/:id", updateBudget);
router.delete("/:id", deleteBudgetById);

module.exports = router;
