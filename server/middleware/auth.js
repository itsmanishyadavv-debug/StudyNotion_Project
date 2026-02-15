const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.auth = async(req,res,next) =>{
    try{

        console.log("token in cookie:",req.cookies)
        // console.log("i am inside auth middleware------------------------------------------------------------------------------------------------")

        const token = req.body.token || req.cookies.token || req.headers.authorization?.split(" ")[1];
        console.log(token)
        if(!token){
            return res.json({
                success:false,
                message:"Token not found",
            });
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }catch(e){
            return res.json({
                success:false,
                message:"Error occured during token verification",
                error:e.message,
            });
        }

        next();

    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during auth middleware check",
            error:e.message,
        });
    }
}

exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.json({
                success:false,
                message:"This route is only for student",
            });
        }
        next();
    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during isStudent middleware check",
            error:e.message,
        });
    }
}

exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.json({
                success:false,
                message:"This route is only for Instructor",
            });
        }
        next();
    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during isInstructor middleware check",
            error:e.message,
        });
    }
}


exports.isAdmin = async(req,res,next) =>{
    try{
        console.log("accountype is:",req.user.accountType);
        if(req.user.accountType !== "Admin"){
            return res.json({
                success:false,
                message:"This route is only for Admin",
            });
        }
        next();
    }catch(e){
        return res.json({
            success:false,
            message:"Error occured during isAdmin middleware check",
            error:e.message,
        });
    }
}