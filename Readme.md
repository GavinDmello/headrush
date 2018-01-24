# Headrush&nbsp;&nbsp;[![Build Status](https://travis-ci.org/rahulbhanushali/headrush.svg?branch=master)](https://travis-ci.org/rahulbhanushali/headrush) &nbsp;&nbsp; [![Coverage Status](https://coveralls.io/repos/github/rahulbhanushali/headrush/badge.svg?branch=master)](https://coveralls.io/github/rahulbhanushali/headrush?branch=master)

A minimal solution to defer `application starts` after you have resolved your network or file dependencies.

If you have multiple dependencies like connecting to a database or other initial processing that needs to be done before the application starts, this will come in handy.

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
    // After connecting to redis
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


