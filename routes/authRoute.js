const { Router } = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { signIn } = require("../controllers/authController");

const router = Router();

router.post("/", signIn);

module.exports = router;
