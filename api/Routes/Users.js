import express from "express";
const Router =express.Router();
import { deleteuser, getalluser, getoneuser, updateuser } from "../Controller/UserController.js";
import { verifyAdmin, verifyuser } from "../Utils/VerifyToken.js";


// Router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//  res.send("hello user, you are logged in");
// })
// Router.get("/checkuser/:id",verifyuser,(req,res,next)=>{
// res.send("hello user, you are logged in and you can delete your account");
// })
// Router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
// res.send("hello user, you are logged in and you can delete all account");
// })



// read all
Router.get("/", getalluser);

// read one
Router.get("/:id", verifyuser, getoneuser)
// update
Router.put("/:id", verifyuser, updateuser)

// delete
// Router.delete("/:id",verifyuser, deleteuser)
Router.delete("/:id", deleteuser)


export default Router;