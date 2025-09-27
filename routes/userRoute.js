const { Router } = require("express");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers");
const { authentificate } = require("../middlewares");

const router = Router();

// router.use(authentificate);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
