const mongoose = require("mongoose");
const {mailSender} = require("../utils/sendMail");
const otpTemplate = require("../controllers/mail/templates/emailVerificationTemplate");

const OTPSchema = mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
   
    otp:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
});

async function mailer(email,otp){
    try{
        const mailSend = mailSender(email,otpTemplate(otp),"OTP Verification | StudyNotion by-Manish");
        return mailSend;
    }catch(e){
        console.log("Error occured during sending Mail",e.message);
    }
}

OTPSchema.pre("save",async function(next){
   await mailer(this.email,this.otp);
   next();
})

module.exports = mongoose.model("OTP",OTPSchema);