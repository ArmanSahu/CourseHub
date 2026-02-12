const express = require("express");
const {getProfile,getUserCourse} = require("../controller/user.controller");
const router = express.Router();

router.get("/profile",getProfile);
router.get("/purchases",getUserCourse);

module.exports = router;