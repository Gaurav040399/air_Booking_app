const express = require("express")
const userRoute = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../model/user.model")

userRoute.post("/api/register",async(req,res)=>{
    try {
        const {email,name,password} = req.body
        let isUser = await UserModel.findOne({email})

        if(isUser){
            return res.status(400).send({msg:"User Already present, Please login"})
        }

        let hashPass =await bcrypt.hash(password,4)
        let newUser = new UserModel({...req.body,password:hashPass})
        await newUser.save()

        res.status(201).send({msg:"User Register Seccessfull", user:newUser})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong in register Route", error:error.message})
    }
})

userRoute.post("/api/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        let isUser = await UserModel.findOne({email});

        if(!isUser){
            return res.status(400).send({msg:"User Not Found, Please register first"})
        }

        let isPassCorrect = bcrypt.compare(password,isUser.password)

        if(!isPassCorrect){
            return res.status(400).send({msg:"Invalid Credential"})
        }

        let token = jwt.sign({userID : isUser._id, email:isUser.email},process.env.secrete_key)

        res.status(201).send({msg:"User Login Seccessfull" , token:token})

    } catch (error) {
        res.status(400).send({msg:"Something went wrong in Login Route", error:error.message})
    }
})


module.exports = {userRoute}