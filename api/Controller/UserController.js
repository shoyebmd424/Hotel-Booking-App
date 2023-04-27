import User from "../Model/User.js";
export const getoneuser=async(req,res,next)=>{
    try {
        const user= await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const getalluser=async(req,res,next)=>{
    try {
        const user= await User.find();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}
export const updateuser=async(req,res,next)=>{
    try {
        const userupdate= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(userupdate);
    } catch (error) {
        next(error)
    }
}

export const deleteuser=async (req,res,next)=>{
    try {
       await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted succesfully");
    } catch (error) {
        next(error)
    }
}