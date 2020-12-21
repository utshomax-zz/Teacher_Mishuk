const controllers = require('../controllers/controllers')

const route =[
    {
        method:'PUT',
        url:'/api/addCount',
        handler: controllers.addCount
    },
    {
        method:'GET',
        url:'/api/count',
        handler: controllers.count
    },
]

module.exports =route