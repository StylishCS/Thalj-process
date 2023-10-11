var express = require("express");
var router = express.Router();
const { payment, paymentStatus } = require("../controller/paymobController");
const authPayment = require("../middlewares/paymentAuth");
const orderRegister = require("../middlewares/orderRegisteration");
const paymentKeyAuth = require("../middlewares/paymentKey");
const auth = require("../middlewares/protect")

router.post("/pay/:orderId",auth, authPayment, orderRegister, paymentKeyAuth, payment);
router.get("/status", paymentStatus);

module.exports = router;
