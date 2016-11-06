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

// var stream = talk_03_s()
// stream.pipe(process.stdout), undefined
