const Rx = require('node-keyboard/lib/rx')()

const mouseEvents = require('osx-mouse')()

module.exports = ({ w, h } = { w: 2560, h: 1440 }) => {
    const mouseMove = Rx.Observable
        .fromEvent(mouseEvents, 'move', (x, y) => {
            return { x: Math.ceil(x), y: Math.ceil(y) }
        })

    const throttledMidiNotes = mouseMove
        .throttle(({ x }) => Rx.Observable.timer(x / w * 1000))
        .map(({ y }) => Math.min(Math.round(88 * y / h) + 21, 109) )

    return throttledMidiNotes
}

// talk_12_rmos({ w: 1280, h: 720 }).subscribe(play), undefined
