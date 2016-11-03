
const Rx = require('rxjs/Rx')
const chalk = require('chalk')
const twitterSentiment = require('twitter-sentiment')

const play = require('node-keyboard/lib/mappers').play

module.exports = ({ track, minFollowers }) => {

    const readable = twitterSentiment({ track, minFollowers })

    const tweets = Rx.Observable.fromEvent(readable, 'data').

    tweets.subscribe(tweet => {
        process.stdout.write(`score: ${tweet.sentiment.score}, comparative: ${tweet.sentiment.comparative.toFixed(2)}`)
        process.stdout.write(` ${chalk.green(tweet.sentiment.positive.join(' '))} ${chalk.red(tweet.sentiment.negative.join(' '))}\n`)
    })

    return tweets.map(tweet => 48 + tweet.sentiment.score).flatMap(note => [ note, note + 12 ]).subscribe(play)
}

// talk_14_rx_twitter({ track: 'bieber', minFollowers: 500 }), undefined


// NOTE: could filter out score: 0 - might be interesting
