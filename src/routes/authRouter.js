const adminData = require('../models/admin');
async function AuthRouter(fastify){
    fastify.get('/api/authUser/:token',async(req,reply)=>{
        try {
            if(typeof req.params.token=='undefined'){  
                reply.send({'status':4,'msg':'request error'})
                return
            }
            var token = req.params.token;
            var data;
            if (token.length > 0) {
                data = {
                    token:token
                }
            } else {
                reply.send({'msg':'length error'})
                return
            }
            const result= await adminData.findOne(data, function(err, adminData) {
      
                if (err) {
                    reply.send({'msg':'db error'})
                    return
                }
                return adminData
            });
            if(result){
                const jtoken = await reply.jwtSign({
                    name: result.name,
                    type: result.type,
                    token:result.token
                  })
                
                reply.setCookie('token', jtoken, {
                        
                        path: '/',
                        
                        httpOnly:true,
                        maxAge:3600,
                      })
                    .send(result)
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