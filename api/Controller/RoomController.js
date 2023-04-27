import Room from "../Model/Room.js";
import Hotel from "../Model/Hotel.js";
export const createRoom =async(req,res,next)=>{
const hotelid=req.params.hotelid;
const newRoom=new Room(req.body);
try {
    const saveRoom=await newRoom.save();
    try {
        await Hotel.findByIdAndUpdate(hotelid,{$push:{rooms:saveRoom._id}})
    } catch (err) {
        next(err)
    }
    res.status(200).json(saveRoom);
} catch (err) {
    next(err)
}
}


export const getoneRoom=async(req,res,next)=>{
    try {
        const room= await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error)
    }
}

export const getallRooms=async(req,res,next)=>{
    try {
        const room= await Room.find(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error)
    }
}
export const updateRoom=async(req,res,next)=>{
    try {
        const roomupdate= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(roomupdate);
    } catch (error) {
        next(error)
    }
}
export const updateAvailibilityRoom=async(req,res,next)=>{
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailabeDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
}

export const deleteRoom=async (req,res,next)=>{
    const hotelid=req.params.hotelid;
    try {
       await Room.findByIdAndDelete(req.params.id);
       try {
       await Hotel.findByIdAndUpdate(hotelid,{$pull:{roomNumbers:req.params.id}});
    } catch (error) {
        next(error)
    }
        res.status(200).json("Room has been deleted succesfully");
    } catch (error) {
        next(error)
    }
}