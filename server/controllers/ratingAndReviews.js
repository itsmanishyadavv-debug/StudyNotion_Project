const Course = require("../models/course");
const user = require("../models/user");
const RatingAndReviews = require("../models/ratingAndReview");


exports.createRating = async(req,res) =>{
    try{
         const userId = req.user.id;
        const {courseId,rating,reviews} = req.body;
        if(!courseId || !rating || !reviews){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }

        const isStudentEnrolled = await Course.findOne({_id:courseId},
                                                        {
                                                            studentEnrolled:{$elemMatch:userId},
                                                        });

        if(!isStudentEnrolled){
            return res.json({
                success:false,
                message:"You are not enrolled in this course",
            });
        }

        const isReviewed = await RatingAndReviews.findOne({user:userId,course:courseId});
        if(isReviewed){
            return res.json({
                success:false,
                message:"No Re-reviewed is allowed",
            }); 
        }

        const newReview = await RatingAndReviews.create({
            rating,reviews,
            user:userId,
            course:courseId,
        });

        await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews:newReview._id, 
                                            }
                                        },
                                        {new:true}
        );

        return res.json({
            success:true,
            message:"Rating And Review created succesfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"Rating And Review not created",
            error:e.message,
        });
    }

}

exports.getAvgRating = async(req,res) =>{
    try{
        const {courseId} = req.body;
        const avgRating = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    avgRating:{$avg:"$rating"},
                }
            },
        ]);

        if(avgRating.length == 0){
            return res.json({
                success:true,
                avgRating:0,
            });
        }

        return res.json({
            success:true,
            avgRating:avgRating[0].avgRating,
        });
    }catch(e){
        return res.json({
            success:true,
            error:e.message,
        });
    }
}


exports.getAllRating = async(req,res) =>{
    try{
        const courseRating = await RatingAndReviews.find({}).sort({rating:"desc"})
                                                            .populate({path:"user",select:"firstName lastName email image"})
                                                            .populate({path:"course",select:"courseName"}).exec();
        if(!courseRating){
            return res.json({
                success:false,
                message:"No rating and reviews found",
            });
        }
        return res.json({
            success:true,
            data:courseRating,
        });
    }catch(e){
        return res.json({
            success:false,
            message:e.message,
        });
    }
}