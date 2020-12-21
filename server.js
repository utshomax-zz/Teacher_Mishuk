
const fastify = require('fastify')({
    logger:true
})
fastify.register(require('fastify-cookie'))

fastify.register(require('fastify-cors'),{
    origin:['http://127.0.0.1:5500','http://127.0.0.1:5501','http://localhost:5500'],
    credentials:'include',
})

fastify.register(require('./src/routes/authRouter'))
const routes = require('./src/routes')
const mongose =require('mongoose')
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mishuk';

mongose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
.then(() => console.log("DB Connected!"))
.catch(err => console.log(err))

fastify.get('/',async(req,rep) => {
    return {Hello : 'World'}
})
const jwt = require('fastify-jwt')

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'Mad@vert__2020',
  cookie: {
    cookieName: 'token'
  }
})

fastify.decorate("jwtVerifyUser", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  .after(() => {
    routes.forEach(route => {
      route['preHandler']=[fastify.jwtVerifyUser];
      fastify.route(route)
});
})


const start = async() =>{
    try{
        await fastify.listen(PORT,"localhost")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}
//fastify.register(require('./src/controllers/notificationController'))
start()
