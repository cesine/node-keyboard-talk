const streams = require('node-keyboard/lib/streams')

const { from, on, delay } = streams

const midiIn = require('node-keyboard/lib/midi')()

module.exports = () => {

    // banjo loop
    from('c','e','g').pipe(delay(400)).pipe(on('banjo')).pipe(streams.toAudio)

    midiIn.pipe(delay(400)).pipe(streams.toAudio).pipe(streams.toPiano)
}

// [Show keyboard] play arpeggio triads
