const jwt = require("jsonwebtoken");

function generateToken(user){
    return jwt.sign({
        userid : user._id
    },process.env.JWT_SECRET);
}

module.exports = {generateToken}