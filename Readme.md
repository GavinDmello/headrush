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
You need to provide the initial dependencies you're expecting , after which the ready event will be emitted. This needs to be provided once only.
Also,  you need to call the `stun` function once you have finished some specific processing.

### Single file example
```js
var HeadRush = require('headrush')
var headRush = new HeadRush({
    deps: [
    'intialProcessing',
    'redis',
    'mongo'
]})


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
        dep: 'mongo'
    })
}

initialProcessing()
connectToMongo()
connectToRedis()

```


### Multiple file Example
File 1
```js
    var HeadRush = require('headrush')
    var headRush = new HeadRush({
        deps: [
        'intialProcessing',
        'someMoreProcessing'
    ]})

    function initialProcessing() {
        // do some processing here
        headRush.stun({
            dep: 'intialProcessing'
        })
    }

```
File 2

```js
    var HeadRush = require('headrush')
    var headRush = new HeadRush()

    function someMoreProcessing() {
        // do some processing here
        headRush.stun({
            dep: 'someMoreProcessing'
        })
    }

```
-----------------
## License
MIT


