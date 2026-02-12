const {verifyToken} = require("../utils/token");

function validateAdmin(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"Token expired or Invalid"});
    }
    try{
        const decode = verifyToken(token);
        console.log(decode.role);
        if(decode.role !== "admin"){
            return res.status(400).json({message:"Admin only"});
        }
        req.user = {
            userid : decode.userid,
            role : decode.role
        }
        console.log("validated")
        next();
    }catch(err){
        return res.status(400).json({message:`Invalid Token : ${err.message}`});
    }
}

module.exports = validateAdmin;