import  Express from "express";
import { createRoom, getallRooms, getoneRoom, updateRoom,deleteRoom, updateAvailibilityRoom } from "../Controller/RoomController.js";
import {verifyAdmin} from "../Utils/VerifyToken.js"
const Router =Express.Router();

// read all
Router.get("/",getallRooms);
//create
Router.post("/:hotelid" , verifyAdmin,createRoom)
// read one
Router.get("/:id",getoneRoom)


// update
Router.put("/:id",verifyAdmin,updateRoom)
Router.put("/availability/:id",updateAvailibilityRoom)

// delete
Router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)


export default Router;