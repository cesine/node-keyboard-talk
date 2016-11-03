const Readable = require('stream').Readable

module.exports = () => {
    return new Readable({
        read() {
            this._i = this._i || 0
            setTimeout(() => {
                this.push('empire!'[this._i++] || null)
            }, 250)
        }
    })
}

// var streamd = talk_03_stream_on_read()
// stream.pipe(process.stdout), undefined
