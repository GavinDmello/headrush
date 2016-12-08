# Headrush

A minimal solution to defer `application starts` after you have resolved your network or file dependancies.

If you have multiple dependancies like connecting to a database or other initial processing that needs to be done before the application starts, this will come in handy.

------------------------
## Installation

```
  npm install headrush
```

---------------
## Usage
You need to provide the initial events you're expecting , after which the ready event will be emitted. This needs to be provided once only.
Also,  you need to call the `stun` function once you have finished some specific processing.

### Single file example
```js
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

```


### Multiple file Example
File 1
```js
    var HeadRush = require('headrush')
    var headRush = new HeadRush([
        'intialProcessing',
        'someMoreProcessing'
    ])

    function initialProcessing() {
        // do some processing here
        headRush.stun('intialProcessing')
    }

```
File 2

```js
    var HeadRush = require('headrush')
    var headRush = new HeadRush()

    function someMoreProcessing() {
        // do some processing here
        headRush.stun('someMoreProcessing')
    }

```
-----------------
## License
MIT


