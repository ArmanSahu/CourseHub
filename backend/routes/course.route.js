const express = require("express");
const router = express.Router();
const {getCourses,getCourse} = require("../controller/course.controller");
router.get("/",getCourses);
router.get("/:id",getCourse);

module.exports = router;