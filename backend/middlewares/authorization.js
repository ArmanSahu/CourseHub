const {verifyToken} = require("../utils/token");
function authorization(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];;
    if(!token){
        return res.status(401).json({message : "Token Not found! Please SignIn"});
    }
    try{
        const decode = verifyToken(token);
        req.userid = decode.userid;
        console.log("authorized user");
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid or Expired Token"});
    }
}

module.exports = authorization;