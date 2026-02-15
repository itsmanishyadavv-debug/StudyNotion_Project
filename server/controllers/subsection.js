const SubSection = require("../models/subSection");
const Section = require("../models/section");
const {uploadToCloudinary} = require("../utils/uploadToCloudinary");
require("dotenv").config();

exports.createSubSection = async(req,res) =>{
    try{
            const {title,description,timeDuration="1",sectionId} = req.body;
        const video = req.files.videoFile;
        console.log("title",title,description,sectionId,video);
        if(!title || !description  || !sectionId || !video){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }
        console.log("uploading video to cloudinary");
        const response = await uploadToCloudinary(video,process.env.FOLDER_NAME);
        console.log("uploaded");
        const newSubSection = await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:response.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{
                                                        $push:{
                                                            subSection:newSubSection._id,
                                                        }
        },{new:true}).populate("subSection");

        return res.json({
            success:true,
            message:"Subsecion created succesfully",
            data:updatedSection,
        });
    }catch(e){
        return res.json({
            success:false,
            message:"unable to create Subsecion",
            error:e.message,
        });
    }
}

exports.updateSubSection = async(req,res) =>{
    try{
        const {subSectionId,title,description,timeDuration} = req.body;
        const video = req.files.videoFile;
        if(!title || !description || !timeDuration || !subSectionId || !video){
            return res.json({
                success:false,
                message:"All fields are required",
            });
        }

        const response = uploadToCloudinary(video,process.env.FOLDER_NAME);
        const updatedSubSection = await SubSection.findByIdAndUpdate({_id:subSectionId},{
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:response.secure_url,
        },{new:true});

        return res.json({
            success:true,
            message:"Subsecion updated succesfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"unable to update Subsection",
            error:e.message,
        });
    }
}

exports.deleteSubSection = async(req,res) =>{
    try{
        
        const {subSectionId} = req.body;
        await SubSection.findByIdAndDelete(subSectionId);
        return res.json({
            success:true,
            message:"Subsecion deleted succesfully",
        });
    }catch(e){
        return res.json({
            success:false,
            message:"unable to delete Subsection",
            error:e.message,
        });
    }
}