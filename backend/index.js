const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const adminRoutes = require("./routes/admin.route");
const courseRoutes = require("./routes/course.route");
const orderRoutes = require("./routes/order.route");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./database/db");
require("dotenv").config();



const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/courses",courseRoutes);
app.use("/api/orders", orderRoutes);

//Connecting to database

connectToDatabase().then(()=>{
    const PORT = process.env.PORT || 8000;
    app.listen(PORT,()=>{
        console.log(`App is running on port ${PORT}`);
    });
})