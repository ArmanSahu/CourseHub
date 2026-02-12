const express = require("express");
const validateUser = require("../middlewares/validation");
const {createCourse,updateCourse,deleteCourse,getUsers,adminSignIn,adminSignUp} = require("../controller/admin.controller");
const validateAdmin = require("../middlewares/adminValidation");
const router = express.Router();

router.post("/signup",validateUser,adminSignUp);
router.post("/signIn",adminSignIn);

router.use(validateAdmin);

router.post("/create-course",createCourse);
router.put("/update-course",updateCourse);
router.delete("/delete-course",deleteCourse);
router.get("/get-users",getUsers);

module.exports = router;