const Course = require("../models/course");
const Tag = require("../models/Tag");
const User = require("../models/user");
const RatingAndReviews = require("../models/ratingAndReview");
const {uploadToCloudinary} = require("../utils/uploadToCloudinary");
require("dotenv").config();

exports.uploadCourse = async(req,res) =>{
    try{
        const {
            courseName,
            courseDescription,
            WhatYouWillLearn,
            price,
            tag,
        } = req.body;
        const thumbnail = req.files.thumbnailImage;

        // console.log("yahn tk aa rha h",courseName,courseDescription,WhatYouWillLearn,price,tag,thumbnail);
        if(!courseName || !courseDescription || !WhatYouWillLearn || !price || !tag || !thumbnail){
            return res.json({
                success:false,
                message:"All fields are Required",
            });
        }
        const instructorDetails = await User.findById({_id:req.user.id});
        if(!instructorDetails){
            return res.json({
                success:false,
                message:"instructon not found",
            });
        }

        
        const tagDetails = Tag.findById(tag);
        if(!tagDetails){
            return res.json({
                success:false,
                message:"tag not found",
            });
        }
        // console.log(tagDetails);
        // console.log(tag);
        // console.log("tagDetails",tagDetails);

        const cloudinaryUpload = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
        const newCourse = new Course({
            courseName:courseName,
            courseDescription:courseDescription,
            whatYouwillLearn:WhatYouWillLearn,
            price:price,
            tags:tag,
            thumbnail:cloudinaryUpload.secure_url,
        });

        const addedCourse = await newCourse.save();
        await User.findByIdAndUpdate({_id:instructorDetails._id},{
                                $push:{
                                    courses:newCourse._id,
                                }
        },{new:true});
        await Tag.findByIdAndUpdate({_id:tag},{
            $push:{
                course:newCourse._id,
            }
        },{new:true});

        return res.json({
            success:true,
            message:"course created succesfully",
            data:addedCourse,
        });
   }catch(e){
    return res.json({
        success:false,
        message:"Course not created",
        error:e.message,
    });
   }
}


exports.getAllCourses = async(req,res) =>{
    try{
        const courses = await Course.find({},{
            courseName:true,
            courseDescription:true,
            WhatYouWillLearn:true,
            price:true,
            studentEnrolled:true,
            Instructor:true,
            ratingAndReviews:true,
        }).populate("Instructor").exec();
        return res.json({
            success:true,
            message:"Course found",
            Data:courses,
        });
    }catch(e){
        return res.json({
            success:false,
            message:"Course not found",
            error:e.message,
        });
    }
}



exports.getCourseDetails = async(req,res) =>{
    try{
        const {courseId} = req.body;

        const course = await Course.find({_id:courseId})
                                        .populate("tags")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .populate({
                                            path:"Instructor",
                                            populate:{
                                                path:"additionalInfo",
                                            }
                                        })
                                        .populate("ratingAndReviews")
                                        .populate("studentEnrolled").exec();
        if(!course){
            return res.json({
                success:false,
                message:"Course not found"
            });
        }

        return res.json({
            success:false,
            message:"course fetched succesfully",
            data:course,
        });
    }catch(e){
        return res.json({
            success:false,
            message:"some king of error occured",
            error:e.message,
        });
    }
}
