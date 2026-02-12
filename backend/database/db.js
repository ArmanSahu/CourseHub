const mongoose = require("mongoose");

async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("App connected to Database");
    }catch(err){
        console.log(`Connection to database failed:${err.message}`);
        process.exit(1);
    }
}

module.exports = connectToDatabase;