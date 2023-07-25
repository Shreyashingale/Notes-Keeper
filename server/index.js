const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userSchema')
require('./db/conn');
app.use(cors())

app.use(express.json())


app.post('/api/register' , async(req , res)=>{
    console.log(req.body)

    try{
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        res.json({status : "ok"});
        
    }
    catch(error){
        res.json({status : "error"});
    }
})

app.post('/api/login' , async(req , res)=>{
    const user = await User.findOne({
        email:req.body.email , 
        password : req.body.password})

        if(user){
            return res.json({status : "login" ,  user :true})
        }
        else{
            return res.json({status:"failed" , user:false})
        }
})


app.listen(5000 , ()=>{
    console.log("Running Server");
})