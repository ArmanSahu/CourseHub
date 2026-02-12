const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PurchaseSchema = new Schema({
    courseId : {
        type : ObjectId,
        ref : "courses",
        required : true
    },
    userId : {
        type : ObjectId,
        ref : "users",
        required : true
    },

},{timestamps : true});



// prevent duplicate purchase
PurchaseSchema.index({
    userId : 1,
    courseId : 1,
},{unique : true});

const PurchaseModel = model("purchases",PurchaseSchema);

module.exports = PurchaseModel;