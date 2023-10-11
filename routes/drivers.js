var express = require("express");
var router = express.Router();
const { signupController } = require("../controller/signUpDriversController");
const { loginController } = require("../controller/loginDriversController");

router.post("/signup", signupController);

router.post("/login", loginController);

module.exports = router;
