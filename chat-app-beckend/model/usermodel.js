const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    profilepic:{
        type:String,
        default:"",
    }
},
{timestamps:true}
);

const user=mongoose.model("User",userschema);

module.exports=user;
