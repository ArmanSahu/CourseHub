const express = require("express");
const {buyCourse,myOrders} = require("../controller/order.controller");
const router = express.Router();

router.post("/purchase",buyCourse);
router.get("/my-orders",myOrders);

module.exports = router;