const Readable = require('stream').Readable

module.exports = () => {
    const readable = new Readable({ read() {} })

    'empire!'.split('').forEach(c => readable.push(c))

    return readable
}

// var stream = talk_03_stream_on_read()
// stream.pipe(process.stdout), undefined
