'use strict'

var events = []
var eventsFired = {}
const EventEmitter = require('events')

class HeadRush extends EventEmitter {
    constructor(eventsProvided) {
        super()
        if (!events.length) {
            events = eventsProvided
        }
        if (!events && !eventsProvided) {
            throw new Error('Initial events need to be present to stun')
        }
    }

    stun(event) {
        if (events.indexOf(event) >= 0) {
            eventsFired[event] = true
            if (Object.keys(eventsFired).length >= events.length) {
                eventsFired = events = null
                this.emit('ready')
            }
        } else {
            throw new Error('Event stunned not present in the expected events set')
        }
    }
}

module.exports = HeadRush
