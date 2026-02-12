const UserModel = require("../models/UserModel");
const {hashPassword,verifyPassword} = require("../utils/passwordHashingAndVerifying");
const {generateToken} = require("../utils/token");


async function signUp(req,res){
    const {email,username,password} = req.body;
    const hashedPassword = hashPassword(password);
    try{
        await UserModel.create({
            email : email,
            username : username,
            password : hashedPassword,
            role : "user"
        });
        return res.status(201).json({message:"User added succefully"});
    }catch(err){
        if(err.code === 11000){
            return res.status(409).json({message : "Email already exists"});
        }else{
            return res.status(500).json({
                message : "Database error",
                error : err.message
            });
        }
    }
}
async function signIn(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({message : "Please specify email and password"});
    }
    try{
        const user = await UserModel.findOne({
            email : email
        });
        if(!user){
            return res.status(400).json({message : "User with this email not found"});
        }
        const isValid = await verifyPassword(password,user.password);
        if(!isValid){
            return res.status(400).json({message : "Incorrect Password"});
        }
        const token = generateToken(user);
        res.cookie("token",token,{
            httpOnly : true,
            // secure : true,
            sameSite : "strict"
        });
        return res.status(200).json({message : "You are SignedIn"});
    }catch(err){
        return res.status(500).json({
            message : "Database error",
            error : err.message
        });
    }
}

async function signOut(req,res){
    res.clearCookie("token");
    return res.status(200).json({message:"Logged out"});
}

module.exports = {
    signUp,
    signIn,
    signOut
};