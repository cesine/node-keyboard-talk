const Rx = require('node-keyboard/lib/rx')()

const twitterSentiment = require('twitter-sentiment')

module.exports = ({ track, minFollowers }) => {

    const readable = twitterSentiment({ track, minFollowers })

    const tweets = Rx.Observable.fromEvent(readable, 'data')


    // const instruments = ['guitar', 'rock_organ']
    // TODO
    // track.split(/,\s/) and map each word to a different instrument

    return tweets.map(tweet => 48 + tweet.sentiment.score).flatMap(note => [ note, note + 12 ])
}

// talk_15_rx_twitter_instrumental({ track: 'clinton', minFollowers: 10000 }).map(instrument('guitar')).subscribe(play), undefined

