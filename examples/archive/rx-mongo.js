/* eslint-disable no-undef */

const Rx = require('rxjs/Rx')

const MongoOplog = require('mongo-oplog')

module.exports = () => {

    const oplogTail = MongoOplog('mongodb://127.0.0.1:27000', { ns: 'test' }).tail()

    return Rx.Observable.fromEvent(oplogTail, 'insert')
}
