const UserModel = require("../models/UserModel");
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
function createCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function updateCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function deleteCourse(req,res){
    return res.status(200).json({message:"Done"});
}
function getUsers(req,res){
    return res.status(200).json({message:"Done"});
}

module.exports = ({
    adminSignUp,
    adminSignIn,
    createCourse,
    updateCourse,
    deleteCourse,
    getUsers
})