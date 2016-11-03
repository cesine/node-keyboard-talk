const Rx = require('rxjs/Rx')

const twitterSentiment = require('twitter-sentiment')

module.exports = ({ track, minFollowers }) => {

    const readable = twitterSentiment({ track, minFollowers })

    const tweets = Rx.Observable.fromEvent(readable, 'data')

    return tweets.map(tweet => 48 + tweet.sentiment.score).flatMap(note => [ note, note + 12 ])
}

// talk_15_rx_twitter_instrumental({ track: 'clinton', minFollowers: 10000 }).map(instrument('guitar')).subscribe(play), undefined

// maybe another tracker on bass?
