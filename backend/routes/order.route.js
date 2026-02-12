const express = require("express");
const router = express.Router();

router.post("/buy-course",buyCourse);
router.get("my-orders",myOrders);

module.exports = router;