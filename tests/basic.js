var HeadRush = require('../')
var test = require('tape').test

test('should emit ready event when all dependencies are stunned', function (t) {
    t.plan(1)

    //list of dependencies
    var headRush = new HeadRush({
        deps: [
        'one',
        'two',
        'three'
    ]})

    headRush.on('ready', function() {
        t.pass('ready event triggered after all dependencies are stunned')
    })

    function initOne() {
        headRush.stun({dep: 'one'})
    }

    function initTwo() {
        headRush.stun({dep: 'two'})
    }

    function initThree() {
        headRush.stun({dep: 'three'})
    }

    initOne()
    setTimeout(initTwo, 00)
    setTimeout(initThree, 00)
})