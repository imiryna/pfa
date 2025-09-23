const { getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory } = require("../controllers");
const { Router } = require("express");

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.post("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
