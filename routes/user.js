const User= require("../models/User")

const express = require('express')
const router = express.Router() ;


router.post("/signIn", async (request , response)=>{
    try{
        console.log("adding user")
        data = request.body ;
        var user = new User(data) ;
        var userInfo= await user.save() 
        var status  = {
            "message" : "user added successfully",
            "userInfo": userInfo
        } 
        response.send(status)
    }
    catch (error) {
        var status = {
            "message" : "error in adding the new user",
            "error": error
        }
        response.send(status)
    }
})


router.get("/all", async (request , response)=>{
    try{
        console.log("finding users")
        var users= await User.find()
        response.send(users)

    }catch(error){
        var status = {
            "message" : "error fetching data from the data base",
            "error": error
        }
        response.send(status)
    }

})

router.get("/find/:id", async (request , response ) =>{
   try{
    var id = request.params.id ;
    console.log("finding user with id : ",id)
    var status = {
        message : "User found",
        UserInfo : await User.findOne({_id:id})
    }    
    response.send(status)
   }catch(error){
    var status = {
        "message" : "error finding user  from the data base",
        "error": error
    }
    response.send(status)
   }




})


router.get("/delete/:id" , async (request , response)=>{
    try {    
        var id = request.params.id ; 
        console.log("deleting user with id : ", id )
        var status ={
            messgae : "User deleted",
            userDeleted: await User.findByIdAndDelete({_id:id})
        }
        response.send(status)
    }catch (error){
        var status = {
            "message" : "error deleting  from the data base",
            "error": error
        }
        response.send(status)
    }
})

router.put("/update/:id", async (request , response)=>{
    try {
        var id = request.params.id ; 
        var data = request.body
        infoUser = await User.findByIdAndUpdate({_id:id}, data)
        response.send(infoUser)
    }catch(error){
        var status = {
            "message" : "error finding user  from the data base",
            "error": error
        }
        response.send(status)
    }
})



module.exports= router