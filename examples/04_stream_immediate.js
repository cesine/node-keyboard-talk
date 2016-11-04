const Readable = require('stream').Readable

module.exports = () => {
    const readable = new Readable({ read() {} })

    'empire!'.split('').forEach(c => readable.push(c))

    return readable
}

// talk_04_stream_immediate().pipe(process.stdout), undefined
