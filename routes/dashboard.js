var express = require("express");
var router = express.Router();
const dashboard = require("../controller/dashboardControllers")

const auth = require("../middlewares/protect");

router.use(auth);

router.get('/', dashboard.dashboard)
router.patch('/:id', dashboard.Acceptance)

module.exports = router;
