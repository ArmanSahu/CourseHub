const express = require("express");


const router = express.Router();

router.get("/profile",getProfile);
router.get("/my-courses",getUserCourse);

module.exports = router;