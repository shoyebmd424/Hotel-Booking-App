import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoutes from "./Routes/Auth.js";
import HotelRoutes from "./Routes/Hotels.js";
import RoomRoutes from "./Routes/Rooms.js";
import UserRoutes from "./Routes/Users.js";
import cookieParser from "cookie-parser";
import  Cors  from "cors";
const app= express();
app.use(express.json());
app.use(cookieParser()); 
app.use(Cors());
dotenv.config();
mongoose.set('strictQuery',false);
const connect=async()=>{
    try{
 await mongoose.connect(process.env.MONGOBD_URI);
 console.log("Database is connected");
    }catch(err){
    throw err;
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("Database is disconnected");
})
app.use("/api/auth",AuthRoutes);
app.use("/api/hotel",HotelRoutes);
app.use("/api/room",RoomRoutes);
app.use("/api/user",UserRoutes);

app.use((err,req,res,next)=>{
   const errorStatus=err.status||500;
   const errorMessage=err.message||"something went Wrong"
;
return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
})
})

app.listen(300,(req,res)=>{
    connect();
    console.log("server is running on port 300");
})