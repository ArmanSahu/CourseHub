const UserModel = require("../models/UserModel");
const CourseModel = require("../models/CourseModel");
const PurchaseModel = require("../models/PurchaseModel");
const {hashPassword,verifyPassword} = require("../utils/passwordHashingAndVerifying");
const {generateAdminToken} = require("../utils/token");

async function adminSignUp(req,res){
   const {email,username,password,secretkey} = req.body;
   try{
        if(secretkey !== process.env.ADMIN_SECRET_KEY){
            return res.status(400).json({message:"Invalid signup"});
        }
        const hashedPassword = await hashPassword(password);
        await UserModel.create({
            email : email,
            username : username,
            password : hashedPassword,
            role : "admin"
        });
        res.status(201).json({message:"Admin created successfully"});
   }catch(err){
        if(err.code === 11000){
            return res.status(500).json({message:`Admin already exists`});
        }
        return res.status(500).json({message:`Database error,${err.message}`});
   }
}
async function adminSignIn(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({message:"Invalid Credentials"});
    }
    try{
        const admin = await UserModel.findOne({email : email});
        if(!admin){
            return res.status(401).json({message:"Admin with this email not found"});
        }
        if(admin.role !== "admin"){
            return res.status(401).json({message:"Role mismatch"});
        }
        const isValid = await verifyPassword(password,admin.password);
        if(!isValid){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = generateAdminToken(admin);
        res.cookie("token",token,{
            httpOnly : true,
            sameSite : "strict"
        });
        res.status(200).json({message:"Admin signed successfully"});
    }catch(err){
        return res.status(500).json({message:`Database Error, ${err.message}`});
    }
}
async function createCourse(req,res){
    const userid = req.user.userid;
    const {title,description,price} = req.body;
    try{
        const user = await UserModel.findById(userid);
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        const newCourse = await CourseModel.create({
            title : title,
            description : description,
            price : price,
            adminId : userid
        });
        res.status(200).json({
            message : "New Course Created",
            newCourse
        });
    }catch(err){
        if(err.code === 11000){
            return res.status(401).json({message:"Course already exists"});
        }
        return res.status(200).json({message:"Databas Error",error : err.message});
    }
}
async function updateCourse(req,res){
    const courseId = req.params.courseId;
    const userid = req.user.userid;
    const {title,description,price} = req.body;
    if(!courseId){
        return res.status(400).json({message:"Empty courseid"});
    }
    try{
        const course = await CourseModel.findById(courseId);
        if(!course){
            return res.status(401).json({message:"No course found"});
        }
        if(userid !== course.adminId.toString()){
            return res.status(401).json({message:"Mismatch in admins"});
        }
        course.title = title ? title.trim() : course.title;
        course.description = description ? description.trim() : course.description;
        course.price = price ? price : course.price;
        await course.save();
        return res.status(200).json({message:"Course updated",course});
    }catch(err){
        return res.status(200).json({message:"Databas Error",error : err.message});
    }
}
async function deleteCourse(req,res){
    const courseId = req.params.courseId;
    const userid = req.user.userid;
    if(!courseId){
        return res.status(400).json({message:"Empty courseid"});
    }
    try{
        const deletedCourse = await CourseModel.findOneAndDelete({
            _id : courseId,
            adminId : userid
        });
        if(!deletedCourse){
            return res.status(200).json({message:"Course not found"});
        }
        res.status(200).json({message:"Deleted course successfully",deletedCourse});
    }catch(err){
        return res.status(200).json({message:"Databas Error",error : err.message});
    }
}

async function getUsers(req,res){
    const courseId = req.params.courseId;
    if(!courseId){
        return res.status(400).json({message:"Empty courseid"});
    }
    try{
        const purchaseDetails = await PurchaseModel.find({
            courseId : courseId
        });
        const userIdDetails = purchaseDetails.map(purchase => purchase.userId);
        if(userIdDetails.length===0){
            return res.status(200).json({message:"No courses purchased"});
        }
        const userdetails = [];
        userIdDetails.forEach(async(id)=>{
            const userinfo = await UserModel.findById(id);
            userdetails.push(userinfo);
        });
        res.status(200).json({userdetails});
    }catch(err){
        return res.status(200).json({message:"Databas Error",error : err.message});
    }
}

module.exports = ({
    adminSignUp,
    adminSignIn,
    createCourse,
    updateCourse,
    deleteCourse,
    getUsers
})