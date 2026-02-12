const express = require("express");
const {createCourse,updateCourse,deleteCourse,getUsers} = require("../controller/admin.controller");
const router = express.Router();

router.post("/create-course",createCourse);
router.put("/update-course",updateCourse);
router.delete("/delete-course",deleteCourse);
router.get("/get-users",getUsers);

module.exports = router;