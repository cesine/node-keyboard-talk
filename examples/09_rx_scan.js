const midiIn = require('node-keyboard/lib/midi')()
const Rx = require('node-keyboard/lib/rx')()

module.exports = () => {
    return Rx.Observable.stream(midiIn)
            .scan((acc,cur) => Object.assign(cur, { last: acc } ))
            .flatMap(note => [note, note.last || note])
}

// var prevNote = talk_09_rx_scan()
// prevNote.subscribe(play), undefined
