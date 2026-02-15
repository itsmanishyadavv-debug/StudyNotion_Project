const Section = require("../models/section");
const Course = require('../models/course');
const { default: mongoose } = require("mongoose");


exports.createSection = async(req,res) =>{
   try{
        const {sectionName,courseId} = req.body;
        if(!sectionName || !courseId){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }
        // console.log("1---------------------------------------");
        const createdSection = await Section.create({sectionName});
        const upadatedCourse = await Course.findByIdAndUpdate({_id:courseId},{
                                                                $push:{
                                                                    courseContent:createdSection._id,
                                                                }
                                                                },{new:true}
        ).populate("courseContent").exec();

        return res.json({
            success:true,
            message:"section created succesfully",
            updatedCourse:upadatedCourse,
        });
   }catch(e){
    return res.json({
        success:false,
        message:"course not created",
        error:e.message,
    });
   }
}

exports.updateSection = async(req,res) =>{
    try{
        const {sectionName,sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }
        
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true});
        return res.json({
            success:true,
            message:"course updated succesfully",
            data:updatedSection,
        });
    }catch(e){
        return res.json({
            success:false,
            message:"unable to update section",
            error:e.message,
        });
       }
}

exports.deleteSection = async(req,res) =>{
    try{
        const {sectionId,courseId} = req.body;
        const deletedSection = await Section.findByIdAndDelete(sectionId);
       const afterDeleted =  await Course.findByIdAndUpdate(
                                            {_id:courseId},
                                        {
                                            $pull:
                                            {
                                                courseContent:sectionId

                                            }
                                        },{new:true}
        );
        return res.json({
            success:true,
            message:"section deleted succesfully",
            data:afterDeleted,
        });
    }catch(e){
        return res.json({
            success:false,
            message:"unable to delete section",
            error:e.message,
        });
       }
}