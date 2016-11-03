/* eslint-disable no-undef */

const repl = require('repl').repl

const Rx = require('rxjs/Rx')

// const MongoOplog = require('mongo-oplog')

const MongoClient = require('mongodb').MongoClient
const MongoCursor = require('mongo-oplog-cursor')

module.exports = () => {

    // track subscriptions
    const subs = []

    MongoClient.connect('mongodb://127.0.0.1:27000/test', (err, db) => {

        if (err) throw err

        var mongoCursor = MongoCursor({ db, ts: 0, ns: 'test.*' }, function getCursor(err, cursor) {

            // Get cursor stream.
            var stream = cursor.stream();

            stream.on('end', function () {
              console.log('stream ended');
            });

            stream.on('data', function (data) {
              console.log(data);
            });

            stream.on('error', function (err) {
              console.log(err);
            });
        });
    })





    // const oplogTail = MongoOplog('mongodb://127.0.0.1:27000', { ns: 'test' }).tail()
    // const mongoOplogCommand = Rx.Observable.fromEvent(oplogTail, 'op')



    // subs.push(mongoOplogCommand.subscribe(console.log))

    repl.on('SIGINT', () => {
        subs.forEach(sub => sub.unsubscribe())
    })
}
