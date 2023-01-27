const express=require("express")
const router=express.Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const config = require("config")

//require the isAuth middleware
const isAuth=require("../middleware/isAuth")

//register user
router.post("/register",async(req,res)=>{
    const{name, email, password}=req.body
    let user= await User.findOne ({email})
    if (user){
       res.send({msg:"user already exist"})
    }

    //create new user
    user=await new User({
        name,
        email,
        password
        
    })
    const salt=10
    const hashedpassword=await bcrypt.hash(password,salt)
    user.password=hashedpassword
    await user.save()

    const payload={id:user._id}

    const token=await jwt.sign(payload,"ttt")


    res.send({msg:"user added !",user,token})

})

//login

router.post("/login",async(req,res)=>{
    const{email,password}=req.body
    let user=await User.findOne({email})
    if(!user){
        res.send({msg:"bad credentialds!email"})
    }

    const isMatch=bcrypt.compare(password,user.password)
    if (!isMatch){
        res.send({msg:"bad credentialds!password"})
    }
    
    const payload={
        id:user.id
    }
    const token=jwt.sign(payload,"ttt")
    

    res.send({msg:"login with succes!",user,token})
})

router.get("/user",isAuth,(req,res)=>{
    res.send({user:req.user})
})

//add post
router.post("/add",async(req,res)=>{
    const{title,desc,image,name}=req.body
    const newPost=new Post({
        title,
        desc,
        image,
        name})
        const post=await newPost.save()
        res.send({msg:"article  added",post})

})



module.exports=router



