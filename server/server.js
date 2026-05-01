const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const courseRoute = require("./routes/course");
const profileRoute = require("./routes/profile");
const paymentRoute = require("./routes/payment");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const {dbConnect} = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

dbConnect();
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials:true,
}));
app.use(fileUpload({
    useTempFiles:true,
    useFileDir:"/tmp"
}));

app.use("/studypulse/version-1.0/auth",userRoute);
app.use("/studypulse/version-1.0/course",courseRoute);
app.use("/studypulse/version-1.0/profile",profileRoute);
app.use("/studypulse/version-1.0/payment",paymentRoute);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:`Your server started on ${PORT}`,
    });
});

app.listen(PORT,()=>{
    console.log(`Your server started on ${PORT}`);
});

// http://localhost:4000/studynotion/version-1.0/auth/signup
// http://localhost:4000/studynotion/version-1.0/auth/sendotp
// http://localhost:4000/studynotion/version-1.0/auth/LogIn
// http://localhost:4000/studynotion/version-1.0/auth/reset-password-token
// http://localhost:4000/studynotion/version-1.0/auth/reset-password
// http://localhost:4000/studynotion/version-1.0/auth/change-password



// http://localhost:4000/studynotion/version-1.0/profile/get-user-details
// http://localhost:4000/studynotion/version-1.0/profile/get-enrolled-course
// http://localhost:4000/studynotion/version-1.0/profile/delete-profile
// http://localhost:4000/studynotion/version-1.0/profile/update-profile
// http://localhost:4000/studynotion/version-1.0/profile/update-profile-pic





// http://localhost:4000/studynotion/version-1.0/payment/verify-signature
// http://localhost:4000/studynotion/version-1.0/payment/capture-payment






// http://localhost:4000/studynotion/version-1.0/course/upload-course
// http://localhost:4000/studynotion/version-1.0/course/create-section
// http://localhost:4000/studynotion/version-1.0/course/update-section
// http://localhost:4000/studynotion/version-1.0/course/create-sub-section
// http://localhost:4000/studynotion/version-1.0/course/delete-section
// http://localhost:4000/studynotion/version-1.0/course/update-sub-section
// http://localhost:4000/studynotion/version-1.0/course/delete-sub-section

// http://localhost:4000/studynotion/version-1.0/course/get-all-courses
// http://localhost:4000/studynotion/version-1.0/course/get-course-details

// http://localhost:4000/studynotion/version-1.0/course/create-category
// http://localhost:4000/studynotion/version-1.0/course/get-category
// http://localhost:4000/studynotion/version-1.0/course/get-category-course