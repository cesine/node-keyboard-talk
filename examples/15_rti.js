const Rx = require('node-keyboard/lib/rx')()

const twitterSentiment = require('twitter-sentiment')

module.exports = ({ track, minFollowers }) => {

    const readable = twitterSentiment({ track, minFollowers })

    const tweets = Rx.Observable.fromEvent(readable, 'data').finally(() => readable.emit('destroy'))

    return tweets.map(tweet => 48 + tweet.sentiment.score).flatMap(note => [ note, note + 12 ])
}

// talk_15_rti({ track: 'clinton', minFollowers: 10000 }).map(instrument('guitar')).subscribe(play), undefined
