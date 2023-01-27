const User=require("../models/user")
const jwt=require("jsonwebtoken")

const isAuth=async(req,res,next)=>{
    const token=req.headers["authorization"]

    if(!token){
        return res.send({msg:"No token"})
    }
    const decoded=await jwt.verify(token,"ttt")
    const user=await User.findById(decoded.id)
    if(!user){
        res.send({msg:"no user with this token"})
    }
    req.user=user
    next()
}

module.exports=isAuth