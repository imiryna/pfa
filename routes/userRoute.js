const { Router } = require("express");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers");
const { authentificate, checkAddUser, checkUpdateUser } = require("../middlewares");

const router = Router();

router.post("/", checkAddUser, createUser);

router.use(authentificate);

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.patch("/:id", checkUpdateUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
