const { from, on, toAudio, delay } = require('node-keyboard/lib/streams')

const midiIn = require('node-keyboard/lib/midi')()

module.exports = () => {

    // banjo loop
    from('c','e','g').pipe(delay(400)).pipe(on('banjo')).pipe(toAudio)

    midiIn.pipe(delay(400)).pipe(toAudio)
}

// play arpeggio triads
