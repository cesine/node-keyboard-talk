/* eslint-disable no-unused-vars */
//---------------------------

const scalar = () => 'empire!'

//---------------------------

const future = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('empire!'), 250)
    })
}
future().then(console.log)
