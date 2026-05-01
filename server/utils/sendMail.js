const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async(email,body,heading) =>{
   try{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,            
        secure: false, 
        auth:{
            user:process.env.USER_MAIL,
            pass:process.env.PASS,
        },
    });

    console.log("inside mail fn:",process.env.PASS,process.env.USER_MAIL);

    
    const response = await transporter.sendMail({
        from:"StudyPulse by-Manish.dev",
        to:`${email}`,
        subject:`${heading}`,
        html:`${body}`
    })
    console.log("mail work done")
    return;
   }catch(e){
     console.log("this the error",e.message);
     return;
   }
}
