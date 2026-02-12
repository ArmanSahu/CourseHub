const express = require("express");
const router = express.Router();

router.get("/courses",getCourses);
router.get("/courses/:id",getCourse);

module.exports = router;