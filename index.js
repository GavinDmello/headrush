'use strict'

var EventEmitter = require('events')

var DEFAULT_NAMESPACE = 'app'
var DEFAULT_TIMEOUT = 2000

// object containing all namespaces
var NS = {}

/**
 * Main class to handle all your dependencies
 * with support for multiple modules/namespaces.
 */
class HeadRush extends EventEmitter {
    /**
     * options object -> {
     *  deps (required): array - list of strings specifying dependencies
     *  namespace (optional): string - namespace/module to tie the dependencies to,
     *  timeout (optional): integer - timeout for deps to be resolved within specified time
     * }
     */
  constructor (options) {
    super()

    if (!options) {
      options = {}
    }

    var currentNS = options.namespace
    var timeout = options.timeout

    if (!currentNS) {
      currentNS = DEFAULT_NAMESPACE
    }

    if (!NS[currentNS] && !(options.deps && options.deps.length)) {
      throw new Error('Initial dependencies need to be present to stun')
    } else {
      NS[currentNS] = {
        deps: options.deps,
        depsMet: {}
      }
    }

    if (!timeout) {
      timeout = DEFAULT_TIMEOUT
    }

    NS[currentNS].timeout = timeout
    NS[currentNS].context = this

    var that = this
    NS[currentNS].timeoutFunction = setTimeout(function () {
      that.emit('error', {
        code: 1,
        message: 'Not all dependencies stunned within specified timeout of: ' + timeout
      })
    }, timeout)

    return NS[currentNS].context
  }

  stun (options) {
    var dep = options.dep
    var namespace = options.namespace || DEFAULT_NAMESPACE

    if (NS[namespace].deps.indexOf(dep) >= 0) {
      NS[namespace].depsMet[dep] = true

      if (Object.keys(NS[namespace].depsMet).length >= NS[namespace].deps.length) {
        NS[namespace].context.emit('ready', {
          ns: namespace
        })

        clearTimeout(NS[namespace].timeoutFunction)
        delete NS[namespace]
      }
    } else {
      NS[namespace].context.emit('error', {
        code: 2,
        message: 'Dependency stunned not present in the expected dependencies set'
      })
    }
  }
}

module.exports = HeadRush
