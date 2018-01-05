var HeadRush = require('../')
var test = require('tape').test

test('should call ready individually for multiple namespaces', function (t) {
    t.plan(2)

    var namespace = 'one'

    var headRush = new HeadRush({
        namespace: namespace,
        deps: ['one']
    })

    headRush.on('ready', function (error) {
        t.pass('Ready event fired for namespace 1')
    })

    var namespace2 = 'two'

    var headRush2 = new HeadRush({
        namespace: namespace2,
        deps: ['two']
    })

    headRush2.on('ready', function (error) {
        t.pass('Ready event fired for namespace 2')
    })

    headRush.stun({
        namespace: namespace,
        dep: 'one'
    })

    setTimeout(function () {
        headRush2.stun({
            namespace: namespace2,
            dep: 'two'
        })
    }, 1000)
})