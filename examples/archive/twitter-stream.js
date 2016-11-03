'use strict'

const Writable = require('stream').Writable

const twitterSentiment = require('twitter-sentiment')

const readable = twitterSentiment({ track: 'clinton', minFollowers: 10000 })
readable.pipe(new Writable({
    objectMode: true,
    write(chunk, enc, next) {
        console.log(chunk.text)
        console.log(`score: ${chunk.sentiment.score}, comparative: ${chunk.sentiment.comparative}`)
        next(null)
    }
}))
