const Rx = require('rxjs/Rx')

module.exports = () => {
    return Rx.Observable
      .from('empire!'.split(''))
      .concatMap(c => Rx.Observable.of(c).delay(250))

    // Alternative that stars with the interval first
    // Rx.Observable
    //   .interval(250)
    //   .map(i => 'empire!'[i])
    //   .take('empire!'.length)
}

// var streamingRx = talk_07_rx_stream()
// streamingRx.subscribe(c => process.stdout.write(c)), undefined
