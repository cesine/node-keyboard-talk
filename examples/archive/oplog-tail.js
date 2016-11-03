const MongoOplog = require('mongo-oplog')

module.exports = () => {
    const oplog = MongoOplog('mongodb://127.0.0.1:27000', { ns: 'test' }).tail()

    oplog.on('op', function (data) {
        console.log(data)
    })

    // oplog.on('insert', function (doc) {
    //     console.log(doc)
    // })

    // oplog.on('update', function (doc) {
    //     console.log(doc)
    // })

    // oplog.on('delete', function (doc) {
    //     console.log(doc.o._id)
    // })

    oplog.on('error', function (error) {
        console.log(error)
    })

    oplog.on('end', function () {
        console.log('Stream ended')
    })

    oplog.stop(function () {
        console.log('server stopped')
    })

}
