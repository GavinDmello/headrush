var HeadRush = require('headrush')
var headRush = new HeadRush([
    'intialProcessing',
    'redis',
    'mongo'
])


headRush.on('ready', function() {
    // call the function to start your app
    console.log('ready')
})

function initialProcessing() {
    // do some processing here
    headRush.stun('intialProcessing')
}

function connectToRedis() {
    // After conneting to redis
    headRush.stun('redis')
}

function connectToMongo() {
    // After connecting to mongo
    headRush.stun('mongo')
}

initialProcessing()
connectToMongo()
connectToRedis()
