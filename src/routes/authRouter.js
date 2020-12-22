const adminData = require('../models/admin');
async function AuthRouter(fastify){
    fastify.get('/api/authUser/:token',async(req,reply)=>{
        try {
            if(typeof req.params.token=='undefined'){  
                reply.send({'status':4,'msg':'request error'})
                return
            }
            const result= await adminData.findOne({token:req.params.token}, function(err, adminData) {
      
                if (err) {
                    reply.send({'msg':'db error'})
                    return
                }
                return adminData
            });
            if(result){
                const token = await reply.jwtSign({
                    name: result.name,
                    type: result.type,
                    token: result.token
                  })
                
                reply.setCookie('token', token, {
                        domain:'teachermishuk.herokuapp.com',
                        path: '/',
                        sameSite:'none',
                        secure:true,
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