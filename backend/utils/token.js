const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign({
        userid : user._id.toString()
    },process.env.JWT_SECRET);
}

function generateAdminToken(user){
    return jwt.sign({
        userid : user._id,
        role : user.role
    },process.env.JWT_SECRET);
}

function verifyToken(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {generateToken,generateAdminToken,verifyToken};