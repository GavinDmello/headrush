var HeadRush = require('../')
var test = require('tape').test

test('should emit error when dependencies not stunned within specified timeout',
    function (t) {
        t.plan(1)

        let headRushNS = 'timeout'

        //list of dependencies
        var headRush = new HeadRush({
            namespace: headRushNS,
            timeout: 1000,
            deps: [
                'one',
                'two'
            ]
        })

        headRush.on('error', function (error) {
            t.equal(error.code, 1)
        })

        headRush.on('ready', function () {
            t.pass('ready event triggered after all dependencies are stunned')
        })

        function initOne() {
            headRush.stun({
                namespace: headRushNS,
                dep: 'one'
            })
        }

        initOne()
    }
)