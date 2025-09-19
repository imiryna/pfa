const { Router } = require("express");
const { createUser, getAllUsers, updateUser } = require("../controllers/userController");

const router = Router();

// const a = getAllUsers();

//create one  C
router.post("/", createUser);

// get all users R
router.get("/", getAllUsers);

// get one R
router.get("/:id", (req, res) => {
  res.status(200).json(`read ${id}`);
});

// update one U
router.post("/:id", updateUser);

//delete one D
router.delete("/:id", (req, res) => {
  res.status(200).json("delete");
});

module.exports = router;
