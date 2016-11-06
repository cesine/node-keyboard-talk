const midiIn = require('node-keyboard/lib/midi')()
const Rx = require('node-keyboard/lib/rx')()

const { log, play } = require('node-keyboard/lib/mappers')

module.exports = () => {
    Rx.Observable.stream(midiIn)
        .do(() => console.log('-- Chord --'))
        .flatMap(note => [note, 'c3', 'g4', 'c5'])
        .do(log)
        .subscribe(play)
}
