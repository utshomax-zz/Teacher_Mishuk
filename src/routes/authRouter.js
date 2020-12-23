const adminData = require('../models/admin')
async function AuthRouter(fastify){
    fastify.get('/api/authUser/:tkn',async(req,reply)=>{
        try {
            if(typeof req.params.tkn=='undefined'){  
                reply.send({'status':4,'msg':'request error'})
                return
            }
            const result= await adminData.findOne({token:req.params.tkn}, function(err, adminData) {
      
                if (err) {
                    reply.send({'msg':'db error'})
                    return
                }
                return adminData
            });
            if(result){
                const token = await reply.jwtSign({
                    name: result.name,
                    role: result.type,
                  })
                result['token']= token;
                reply.send(result)
                    return
            }
            reply.send({'status':0,'msg':'no user found'}) 
        }
        catch (err) {
          console.log(err)
        }
       
    });
}
module.exports =AuthRouter