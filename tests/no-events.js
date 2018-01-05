var HeadRush = require('../')
var test = require('tape').test

test('should throw error when dependencies are not passed while init', function (t) {
    t.plan(1)

    try {
        var headRush = new HeadRush({namespace: 'no-events'})
    } catch (exception) {
        t.equal('Initial dependencies need to be present to stun', exception.message)
    }
})