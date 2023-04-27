import hotelschema from "../Model/Hotel.js";
import Room from "../Model/Room.js";
export const createrhotel=async(req,res,next)=>{
    const newhotel=new hotelschema(req.body)
    try {
        const hotel= await newhotel.save();
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}
export const getonehotel=async(req,res,next)=>{
    try {
        const hotel= await hotelschema.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

export const getallhotels=async(req,res,next)=>{
    const {min , limit,max,...others}=req.query;
    // console.log(others)
    try {
        // const hotel= await hotelschema.find().limit(req.query.limit);
        const hotel= await hotelschema.find({...others,cheapestPrice:{$gt:min | 1,$lt:max || 999}}).limit(req.query.limit);
        res.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}
export const updatehotel=async(req,res,next)=>{
    try {
        const hotelupdate= await hotelschema.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(hotelupdate);
    } catch (error) {
        next(error)
    }
}

export const deletehotel=async (req,res,next)=>{
    try {
       await hotelschema.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted succesfully");
    } catch (error) {
        next(error)
    }
}

export const countByCity=async(req,res,next)=>{
    const city=req.query.cities.split(",");
    try {
        const list= await Promise.all(city.map(c=>{
            return hotelschema.countDocuments({city:c})
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
export const countBytype=async(req,res,next)=>{
    try {
        const hotelcount=await hotelschema.countDocuments({type:"Hotel"})
        const aprtcount=await hotelschema.countDocuments({type:"appartment"})
        const resortcount=await hotelschema.countDocuments({type:"resort"})
        const cabincount=await hotelschema.countDocuments({type:"cabin"})
        const villacount=await hotelschema.countDocuments({type:"villa"})
        res.status(200).json([
              {type:"hotel",  count:hotelcount},
              {type:"appartment",  count:aprtcount},
              {type:"resort",  count:resortcount},
              {type:"cabin",  count:cabincount},
              {type:"villa",  count:villacount},
        ]
        );
    } catch (error) {
        next(error)
    }
}

export const getHotelRooms=async(req,res, next)=>{
    try {
        const hotel =await hotelschema.findById(req.params.id);
        const list =await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room);
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}