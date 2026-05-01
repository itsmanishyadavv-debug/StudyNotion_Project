const {instances} = require("../config/razorpay");
const User = require("../models/user");
const Course = require("../models/course");
const {sendMail} = require("../utils/sendMail");
const {courseEnrollmentEmail} = require("./mail/templates/courseEnrollmentEmail");


exports.capturePayment = async(req,res) =>{
    try{
        const courseId = req.body;
        const userId = req.user.id;
        if(!courseId){
            return res.json({
                success:false,
                message:"courseId is unavailable",
            });
        }

        const courseDetails = await Course.findById(courseId);
        if(!courseDetails){
            return res.json({
                success:false,
                message:"course not found",
            });
        }

        if(courseDetails.studentEnrolled.includes(mongoose.Types.objectId(userId))){
            return res.json({
                success:false,
                message:"You are already purchased this course",
            });
        }
        const amount = courseDetails.price;
        const currency = "INR";
        const options = {
            amount,
            currency,
            reciept:Math.random(Date.now().toString()),
            notes:{
                courseId:courseId,
                userId,
            }
        }

        try{
            const response = await instances.orders.create(options);
            console.log(response);
            return res.json({
                success:true,
                courseName:courseDetails.courseName,
                thumbnail:courseDetails.thumbnail,
                description:courseDetails.courseDescription,
                orderId:response.id,
                amount:courseDetails.price,
            });
        }catch(e){
            return res.json({
                success:false,
                message:"do not create order"
            })
        }

    }catch(e){
        return res.json({
            success:false,
            message:"do not create order",
            error:e.message,
        });
    }
}


exports.verifySignature = async(req,res) =>{
    const webhookSecret = "12345678";
    const signature = req.header["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if(signature !== digest){
        return res.json({
            success:false,
            message:"Payment is not authorized",
        });
    }

    const {courseId,userId} = req.body.payload.payment.entity.notes;

    try{
        const course = await Course.findByIdAndUpdate({_id:courseId},
                                                    {$push:{studentEnrolled:userId}},
                                                    {new:true},

        );
        if(!course){
            return res.json({
                success:false,
                message:"course not found",
            });
        }
        const userCourse = await User.findByIdAndUpdate({_id:userId},
                                                        {$push:{courses:courseId}},
                                                        {new:true},
        );

        const mailResponse = await sendMail(userCourse.email,
                                            "Thanks for selecting our course",
                                            "By Manish"
        );
        return res.json({
            success:true,
            message:"Course added succesfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"Payment is not authorized",
            error:e.message,
        });
    }
}
