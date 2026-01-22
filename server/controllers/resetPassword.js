const {mailSender} = require("../utils/sendMail");
const User = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");


exports.resetPasswordToken = async(req,res) =>{
    try{
        const email = req.body.email;
        if(!email.includes("@gmail.com") && !email.includes("@nsut.ac.in")){
            return res.json({
                success:false,
                message:"Email must contain @gmail.com or @nsut.ac.in",
            });
        }

        const user = await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Email is not registered",
            });
        }


        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email:email},{
                                                            token:token,
                                                            resetPasswordExpired:Date.now()+5*60*1000,
        },{new:true});
        
        const url = process.env.FRONTEND_URL+`/${token}`;
        console.log("mail sending")
        // const url = "http://localhost:3000"+`/${token}`;
        await mailSender(email,` click here to go reset password page <a href=${url}>click here</a>`,"Reset Your Password By Clicking Here");
        console.log("mail sent")
        return res.json({
            success:true,
            message:"resetPasswordToken generated successfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"erro occured during resetPasswordToken",
            error:e.message,
        });
    }
}

exports.resetPassword = async(req,res) =>{
    try{
        // data fetch 
        const {password,confirmPassword,token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"confirmPassword must be same as password",
            });
        }

        const user = await User.findOne({token:token});
        if(!user || user.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Time out, plz try again",
            });
        }


        // hashing password
        const hashedPassword = await bcrypt.hash(password,10);
        const upadateDetails = await User.findOneAndUpdate({token:token,
        },{password:hashedPassword},{new:true});
        return res.json({
            success:true,
            message:"Password reset successfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"during reseting password",
            error:e.message,
        });
    }
}