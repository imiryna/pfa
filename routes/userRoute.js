const { Router } = require("express");
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers");

const router = Router();

router.get("/", getAllUsers);

// // get one R
router.get("/:id", getUserById);

// //create one  C
router.post("/", createUser);

// // update one U
router.post("/:id", updateUser);

// //delete one D
router.delete("/:id", deleteUser);

module.exports = router;
