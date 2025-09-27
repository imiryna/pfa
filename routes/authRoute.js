const { Router } = require("express");
const { signIn, refreshToken } = require("../controllers");

const router = Router();

router.post("/", signIn);
router.post("/refresh", refreshToken);

module.exports = router;
