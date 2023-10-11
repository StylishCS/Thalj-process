var express = require("express");
var router = express.Router();
const upload = require("../middlewares/uploadFiles");
const editProfile = require("../controller/editProfileController");
const auth = require("../middlewares/protect");

router.use(auth);

router.patch("/", upload.single("image"), editProfile.editProfile);

module.exports = router;
