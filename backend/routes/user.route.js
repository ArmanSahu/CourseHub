const express = require("express");
const {getProfile,getUserCourse} = require("../controller/user.controller");
const auth = require("../middlewares/authorization");
const router = express.Router();

router.use(auth);

router.get("/profile",getProfile);
router.get("/purchases",getUserCourse);

module.exports = router;

