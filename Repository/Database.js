const mongoose = require('mongoose');

const connect = () =>{
    mongoose.connect('mongodb://localhost:27017/ExpenseTracer')
    .then(()=>{console.log("database connected successfully")})
    .catch((err)=>console.log("error while connecting database",err));
}

module.exports = {connect}