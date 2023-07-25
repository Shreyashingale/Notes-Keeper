
const mongoose = require('mongoose')

const DB =  "mongodb+srv://shreyashingale282:Yash282@cluster0.x1y3zpp.mongodb.net/"
mongoose.connect(DB).then(()=>{
    console.log("connection established");
}).catch((err)=>{
console.log(err);
});