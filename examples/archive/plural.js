/* eslint-disable no-unused-vars */
//---------------------------

const iterable = () => 'empire!'.split('')

//---------------------------

const stream = require('stream')
const create = () => new stream.Readable({
    read() {
        this._i = this._i || 0
        setTimeout(() => {
            this.push('empire!'[this._i++] || null)
        }, 250)
    }
})
