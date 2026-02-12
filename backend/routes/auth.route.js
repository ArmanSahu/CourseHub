const express = require("express");
const validateUser = require("../middlewares/validation");
const {signUp,signIn,signOut} = require("../controller/auth.controller");

const router = express.Router();


router.post("/signup",validateUser,signUp);
router.post("/signin",signIn);
router.post("/signout",signOut);

module.exports = router;