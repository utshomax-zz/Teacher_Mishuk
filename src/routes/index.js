const controllers = require('../controllers/controllers')

const route =[
    {
        method:'POST',
        url:'/api/addCount',
        handler: controllers.addCount
    },
    {
        method:'GET',
        url:'/api/counts',
        handler: controllers.count
    },
]

module.exports =route