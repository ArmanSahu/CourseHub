const {z} = require("zod");

const titleSchema = z.string().min(3).max(100);
const descriptionSchema = z.string().regex(/^[A-Z]/,"One uppercase letter");
const priceSchema = z.coerce.number();
const CourseSchema = z.object({
    title : titleSchema,
    description : descriptionSchema,
    price : priceSchema
}).loose();

function validateCourseSchema(req,res,next){
    const result = CourseSchema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({message:"Invalid input fields,",error:result.error.flatten()});
    }
    req.body = result.data;
    next();
}
module.exports = validateCourseSchema;