const { getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory } = require("../controllers");
const { Router } = require("express");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate.protect);

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.post("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
