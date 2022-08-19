const express = require("express");
const auth = require("../middleware/auth");
const meController = require("../controller/user/me");
const registerController = require("../controller/user/register");
const loginController = require("../controller/user/login");

const router = express();

router.get("/me", auth, meController);
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
