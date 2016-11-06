module.exports = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('empire!'), 1000)
    })
}

// talk_02_promise().then(console.log)
// var promise = talk_02_promise()
// promise.then(console.log)
