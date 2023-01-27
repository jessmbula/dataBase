const mongoose = require("mongoose")
const schema=mongoose.Schema

const ArticleSchema = new schema(
{
    title:{
        type:String,
        require:true,
        unique:true,
    },
    desc:{
        type:String,
        require: true,
    },
    image:{
        type: String,
        require: false,
    },
    name:{
        type:String,
        require: true,
    },
    categories:{
        type:Array,
        require: false,
    },
},
  
{ timestamps:true}

)

const Article=mongoose.model("article",ArticleSchema)
module.exports=Article
