const { sequence, piano, play } = require('node-keyboard/lib/mappers')

const Rx = require('node-keyboard/lib/rx')()

module.exports = (key = 'C3') => {
    const progression = [2, 2, 1, 2, 2, 2, 1]

    const modes = Rx.Observable.of(progression)
        .combineLatest(Rx.Observable.range(0, progression.length))
        .map(([x,i]) => {
            x = x.slice()
            for (let j = 0; j < i; j++) x.push(x.shift())
            return x
        })

    const playModes = modes
        .flatMap(seq => sequence(key, seq))
        .concatMap(x => Rx.Observable.of(x).delay(250))

    playModes.subscribe(note => {
        piano(note)
        play(note)
    })
}
