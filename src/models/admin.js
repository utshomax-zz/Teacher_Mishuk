const mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
const adminData = new mongoose.Schema({
    id:Number,
    name:String,
    type:String,
    token:String,
})
autoIncrement.initialize(mongoose.connection);

adminData.plugin(autoIncrement.plugin,{
    model: 'adminData',
    field: 'id',
    startAt: 1000,
    incrementBy: 1
});

module.exports =mongoose.model('adminData',adminData);