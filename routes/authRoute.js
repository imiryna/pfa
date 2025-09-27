const { Router } = require("express");
const { signIn, refreshToken, login } = require("../controllers");

const router = Router();

router.post("/signin", signIn);
router.post("/refresh", refreshToken);

module.exports = router;
