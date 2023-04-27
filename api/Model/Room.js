import mongoose  from "mongoose";
const Roomschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true

    },
    roomNumbers:[{number:Number,unavailabeDates:[{type:[Date]}]}],
},{ timestamp:true}
)
export default  mongoose.model("Rooms", Roomschema);