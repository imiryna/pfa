const { getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory } = require("../controllers");
const { Router } = require("express");
const { authentificate, checkAddCategory, checkUpdateCategory } = require("../middlewares");

const router = Router();

router.use(authentificate);

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", checkAddCategory, createNewCategory);
router.patch("/:id", checkUpdateCategory, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
