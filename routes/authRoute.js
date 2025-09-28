const { Router } = require("express");
const { signIn, refreshToken } = require("../controllers");
const { logout } = require("../controllers/authController");

const router = Router();

router.post("/signin", signIn);
router.post("/refresh", refreshToken);
router.get("/logout", logout);

module.exports = router;
