const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    username : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
},{timestamps : true});

const UserModel = model("users",UserSchema);

module.exports = UserModel;