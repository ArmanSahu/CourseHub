const express = require("express");
const validateUser = require("../middlewares/validation");
const {createCourse,updateCourse,deleteCourse,getUsers,adminSignIn,adminSignUp} = require("../controller/admin.controller");
const validateAdmin = require("../middlewares/adminValidation");
const validateCouserSchema = require("../middlewares/courseSchemaValidation")
const router = express.Router();

router.post("/signup",validateUser,adminSignUp);
router.post("/signIn",adminSignIn);

router.use(validateAdmin);

router.post("/create-course",validateCouserSchema,createCourse);
router.put("/update-course/:courseId",updateCourse);
router.delete("/delete-course/:courseId",deleteCourse);
router.get("/get-users/:courseId",getUsers);

module.exports = router;