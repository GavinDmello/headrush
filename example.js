var HeadRush = require('./index')

var headRush = new HeadRush({
    deps: [
        'intialProcessing',
        'redis',
        'mongo'
    ]
})


headRush.on('ready', function() {
    // call the function to start your app
    console.log('ready')
})

function initialProcessing() {
    // do some processing here
    headRush.stun({
        dep: 'intialProcessing'
    })
}

function connectToRedis() {
    // After conneting to redis
    headRush.stun({
        dep: 'redis'
    })
}

function connectToMongo() {
    // After connecting to mongo
    headRush.stun({
        dep:'mongo'
    })
}

initialProcessing()
connectToMongo()
connectToRedis()
