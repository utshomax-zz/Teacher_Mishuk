
const countData = require('../models/counter')
  exports.addCount= async (req,reply)=>{
    try {
        const add = new countData(req.body);
        const r= await add.save();
        if(req.body.update == true && req.body.id==1000){
          const update = await countData.findOneAndUpdate({id:1000}, {$inc : {count : 1},ref:req.body.ref,date:req.body.date,time:req.body.time},{new:true});
          return update
        }
        else{
          return r;
        }
        
        
      } catch (err) {
        console.log(err)
    }
  }
  exports.count= async (req,reply)=>{
    try {
        const res = await countData.findOne({id:1000});
        if(res){
          return res.toJSON().count
        }
        else{
          return {status:0}
        }
      
      } catch (err) {
        console.log(err)
    }
  }