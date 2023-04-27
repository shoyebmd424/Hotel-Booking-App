import userschema from "../Model/User.js"
import bcrypt from "bcryptjs";
import { createErr } from "../Utils/Error.js";
import  Jwt  from "jsonwebtoken";
export const register=async(req,res,next)=>{
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(req.body.password,salt) 
    try {
        const user=new userschema({
            ...req.body,
            password:hash
        })
    await    user.save();
        res.status(200).send("user register successfully");
    } catch (error) {
        next(error);
        
    }
}
    export const login=async(req,res,next)=>{
        try {
            const user=await   userschema.findOne({
                username:req.body.username,
            })
            if(!user) return next(createErr("404","User not found"));
            const ispassword=await bcrypt.compare(req.body.password,user.password);
            if(!ispassword) return next(createErr("400","Bad Credential"));
        const token =Jwt.sign ({id:user._id,isAdmin:user.isAdmin},process.env.JWT_TOKEN) ;
             
            const {password,isAdmin, ...otherdetail} =user._doc; 
            res.cookie("access_token",token,{httpOnly:true}).status(200).json(otherdetail);
        } catch (error) {
            next(error);
            
        }
}
