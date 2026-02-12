const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CourseSchema = new Schema({
    title : {
        type : String,
        unique : true,
        trim : true,
        toLowerCase : true
    },
    description : String,
    price : Number,
    adminId : {
        type : ObjectId,
        ref : "users",
        required : true
    } 
});

const CourseModel = model("courses",CourseSchema);


module.exports = CourseModel;
