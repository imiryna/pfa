const { getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory } = require("../controllers");
const { Router } = require("express");
const { authentificate } = require("../middlewares");

const router = Router();

router.use(authentificate);

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
