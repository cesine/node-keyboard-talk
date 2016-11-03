const midiIn = require('node-keyboard/lib/midi')()
const Rx = require('node-keyboard/lib/rx')()

module.exports = () => {
    return Rx.Observable.stream(midiIn).flatMap(note => [note, 'c3', 'g4', 'c5'])
}

// var withCMajTriad = talk_08_rx_projection()
// withCMajTriad.subscribe(play), undefined
