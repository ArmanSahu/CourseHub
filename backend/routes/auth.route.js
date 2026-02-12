const express = require("express");


const router = express.Router();


router.post("/signup",validateUser,signUp);
router.post("/signin",signIn);
router.post("/forgotpassword",forgotPassword);
router.post("/resetpassword",resetPassword);
router.post("/signout",signOut);

module.exports = router;