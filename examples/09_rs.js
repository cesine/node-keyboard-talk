const midiIn = require('node-keyboard/lib/midi')()
const Rx = require('node-keyboard/lib/rx')()

const { log, play } = require('node-keyboard/lib/mappers')

module.exports = () => {
    Rx.Observable.stream(midiIn)
        .do(() => console.log('Note with previous'))
        .scan((acc,cur) => Object.assign(cur, { last: { input: acc.input } } ))
        .flatMap(note => [note, note.last || note])
        .do(log)
        .subscribe(play)
}
