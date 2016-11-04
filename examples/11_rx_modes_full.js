const { sequence, play } = require('node-keyboard/lib/mappers')

const Rx = require('node-keyboard/lib/rx')()

module.exports = (key = 'C') => {
    // modes with mode name
    const modeNames = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian']
    const progression = [2, 2, 1, 2, 2, 2, 1]

    const modes = Rx.Observable.of(progression)
        .combineLatest(Rx.Observable.range(0, progression.length))
        .map(([x,i]) => {
            x = x.slice()
            for (let j = 0; j < i; j++) x.push(x.shift())
            return [x,i]
        })

    const playModes = modes
        .flatMap(([seq, i]) => sequence(key, seq).map(n => { return { n, i } }))
        .concatMap(x => Rx.Observable.of(x).delay(250))
        .publish()

    playModes
        .distinct((a, b) => { return a.i === b.i })
        .subscribe(({ i }) => process.stdout.write(`\n${key} ${modeNames[i]}:${i+1}`))

    playModes
        .subscribe(({ n }) => { process.stdout.write(`\t${n}`); play(n) })

    playModes.connect()
}
