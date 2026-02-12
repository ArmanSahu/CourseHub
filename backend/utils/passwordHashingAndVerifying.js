const bcrypt = require("bcrypt");

async function hashPassword(password){
    const saltRound = 10;
    return await bcrypt.hash(password,saltRound);
}

async function verifyPassword(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword);
}

module.exports = {hashPassword,verifyPassword};