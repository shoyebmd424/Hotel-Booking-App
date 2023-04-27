import  Express from "express";
import { countByCity, countBytype, createrhotel, getallhotels, getHotelRooms, getonehotel, updatehotel } from "../Controller/HotelController.js";
import {verifyAdmin} from "../Utils/VerifyToken.js"
// import { createErr } from "../Utils/Error.js";
const Router =Express.Router();
//create
Router.post("/" , verifyAdmin,createrhotel)
// read all
Router.get("/",getallhotels);
// read one
Router.get("/:id",getonehotel)



// update
Router.put("/:id",verifyAdmin,updatehotel)

// delete
Router.delete("/:id", verifyAdmin, updatehotel)

// count hotel 
Router.get("/city/countbycity" ,countByCity)
Router.get("/type/countbytype" ,countBytype)
Router.get("/room/:id" ,getHotelRooms)


export default Router;