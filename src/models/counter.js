const mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
const countData = new mongoose.Schema({
    id:Number,
    ref:String,
    date:String,
    time:String,
    count:Number
})
autoIncrement.initialize(mongoose.connection);

countData.plugin(autoIncrement.plugin,{
    model: 'countData',
    field: 'id',
    startAt: 1000,
    incrementBy: 1
});
module.exports =mongoose.model('countData',countData);