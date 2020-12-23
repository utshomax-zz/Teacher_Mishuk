const mongoose = require('mongoose')
const adminData = new mongoose.Schema({
    id:Number,
    name:String,
    type:String,
    token:String,
    nickname:String
})



module.exports =mongoose.model('adminData',adminData);