const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() =>{console.log("DATABASE connected successfully")})
   . catch((e) =>{
        console.log("DATABASE not connected");
        console.error(e);
        process.exit(1);
    })
}