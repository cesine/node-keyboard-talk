
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

    const { stdout } = process

    return tweets
        .do(({ sentiment }) => {
            stdout.write(`score: ${sentiment.score}, comparative: ${sentiment.comparative.toFixed(2)}`)

            stdout.write(` ${chalk.green(sentiment.positive.map(cleaner).join(' '))}`)
            stdout.write(` ${chalk.red(sentiment.negative.map(cleaner).join(' '))}\n`)
        })
        .finally(() => readable.emit('destroy'))
        .map(tweet => 48 + tweet.sentiment.score)
        .flatMap(note => [ note, note + 12 ])
        .subscribe(play)
}

// talk_14_rt({ track: 'bieber', minFollowers: 500 }), undefined

