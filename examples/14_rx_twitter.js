
const Rx = require('node-keyboard/lib/rx')()
const chalk = require('chalk')
const twitterSentiment = require('twitter-sentiment')
const profanity = new (require('bad-words'))()

const play = require('node-keyboard/lib/mappers').play

// track field https://dev.twitter.com/streaming/overview/request-parameters#track
// 'X,Y' (=> OR) 'X Y' (AND)
module.exports = ({ track, minFollowers }) => {

    const readable = twitterSentiment({ track, minFollowers })

    const tweets = Rx.Observable.fromEvent(readable, 'data')

    const cleaner = profanity.clean.bind(profanity)

    tweets.finally(() => readable.emit('destroy')).subscribe(tweet => {
        process.stdout.write(`score: ${tweet.sentiment.score}, comparative: ${tweet.sentiment.comparative.toFixed(2)}`)

        process.stdout.write(` ${chalk.green(tweet.sentiment.positive.map(cleaner).join(' '))}`)
        process.stdout.write(` ${chalk.red(tweet.sentiment.negative.map(cleaner).join(' '))}\n`)
    })

    return tweets.map(tweet => 48 + tweet.sentiment.score).flatMap(note => [ note, note + 12 ]).subscribe(play)
}

// talk_14_rx_twitter({ track: 'bieber', minFollowers: 500 }), undefined

