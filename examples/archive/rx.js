/* eslint-disable no-unused-vars, no-undef */

const Rx = require('rxjs/Rx')

// Delay
let input = Rx.Observable.stream(midiIn)
input.subscribe(play)
input.delay(500).subscribe(play)

// Merge
input = Rx.Observable.stream(midiIn)
input.merge(input.delay(500), input.delay(750)).subscribe(play)

// Scales
const achromatic = [].concat(scale('a3', 'chromatic'), a4, scale('a3', 'chromatic').reverse())
Rx.Observable.from(achromatic).concatMap(c => Rx.Observable.of(c).delay(250)).subscribe(play)



// Projections

// flatMap: project with a chord
Rx.Observable.stream(midiIn).flatMap(x => [c3, g4, c5, x]).subscribe(play)

// or triads
Rx.Observable.stream(midiIn).flatMap(interval('P1', 'P5', 'P8')).subscribe(play)


// Reductions

// Scan (reduce): pair last note
let prevNote = Rx.Observable.stream(midiIn).scan((acc,cur) => Object.assign(cur, { last: acc } )).flatMap(note => [note, note.last || note])
prevNote.subscribe(play)


// Combinations

let drum = Rx.Observable.stream(from(c,e,g).pipe(on('drum')).pipe(delay(500)))
let piano = Rx.Observable.stream(midiIn)
// combineLatest: take two streams, play latest of each
Rx.Observable.combineLatest(drum, piano).concatAll().subscribe(play)

// compare to zip
Rx.Observable.zip(drum, piano).concatAll().subscribe(play)



// Other

// shared / hot
const sharedMidi = Rx.Observable.stream(midiIn).share()

// replayed
const replayMidi = Rx.Observable.stream(midiIn).multicast(() => new Rx.ReplaySubject()).refCount() // .publishReplay().refCount()

// RxSubject - a bit like a transform stream - both readable and writable
