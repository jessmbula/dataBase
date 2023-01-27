const mongoose = require("mongoose")
const schema=mongoose.Schema

const UserSchema = new schema(
{
    name:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,       
    },
    isadmin:{
        type:Boolean,
        default: false,
    }
},
  
//{ timestamps:true}

)

const User=mongoose.model("users",UserSchema)
module.exports=User