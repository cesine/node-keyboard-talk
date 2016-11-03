const EventEmitter = require('events')

module.exports = () => {
    const myEmitter = new EventEmitter()
    myEmitter.emit('event', 'oh dear')
    return myEmitter
}

// var eventer = talk_01_eventemitter()
// eventer.on('event', console.log), undefined
// eventer.emit('event', 'empire!')
