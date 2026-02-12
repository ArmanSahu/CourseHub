const {z} = require("zod");

const emailSchema = z.string()
                     .email()
                     .trim()
                     .toLowerCase();
const usernameSchema = z.string()
                        .min(4,"Username too short")
                        .max(30,"Uername too Long")
                        .regex(/^[a-z0-9_]+$/,"Username must contain only lower case letters,numbers or underscore");
const passwordSchema = z.string()
                        .min(7)
                        .max(30)
                        .regex(/[A-Z]/,"Password must contain one uppercase Character")
                        .regex(/[a-z]/,"Password must contain one lowercase Character")
                        .regex(/[0-9]/,"Password must contain one number")
                        .regex(/[!@#$%^&*]/,"Password must contain one special Character");
const userSchema = z.object({
    email : emailSchema,
    username : usernameSchema,
    password : passwordSchema
});

function validateUser(req,res,next){
    const result = userSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message:`Validation failed`,errormessage:result.error.flatten()});
    }
    req.body = result.data;
    next();
}

module.exports = validateUser;
