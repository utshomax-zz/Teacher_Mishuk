
const countData = require('../models/counter')
  exports.addCount= async (req,reply)=>{
    try {

        const update = await countData.findOneAndUpdate({id:1000}, {$inc : {count : 1},ref:req.body.ref,date:req.body.date,time:req.body.time},{new:true});
        const add = new countData(req.body);
        await add.save();
        return update 
      } catch (err) {
        console.log(err)
    }
  }
  exports.count= async (req,reply)=>{
    try {
        const res = await countData.find();
        if(res){
          return res
        }
        else{
          return {status:0}
        }
      
      } catch (err) {
        console.log(err)
    }
  }