const mouse = require('osx-mouse')()

// Events
// https://github.com/kapetan/osx-mouse/blob/master/source/mouse.cc#L3-L9

mouse.on('left-down', function(...args) {
    console.log(args)
})

