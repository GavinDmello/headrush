var HeadRush = require('../')
var test = require('tape').test

test('should throw error when dependency stunned is not in initial list of dependencies',
    function (t) {
      t.plan(1)

      var headRushNS = 'missing-event'

        // list of dependencies
      var headRush = new HeadRush({
        namespace: headRushNS,
        deps: [
          'one'
        ]
      })

      headRush.once('error', function (error) {
        t.equal(error.code, 2, error.message)

            // just to handle the timeout error
        headRush.once('error', function () {})
      })

      headRush.on('ready', function () {
        t.pass('ready event triggered after all dependencies are stunned')
      })

      function initTwo () {
        headRush.stun({
          namespace: headRushNS,
          dep: 'two'
        })
      }

      initTwo()
    }
)
