'use strict'

const path = require('path')
const fs = require('fs')

const repl = require('repl').repl

const cardinal = require('cardinal')

module.exports = () => {

    const pathToExamples = path.join(__dirname, '/examples')

    const echoAndRunFile = filename => {
        // process.stdout.write('\x1B[2J')
        process.stdout.write(cardinal.highlightFileSync(path.join(pathToExamples, `${filename}.js`), { linenos: true }))
        process.stdout.write('\n')
        return require(`./examples/${filename}`)
    }

    fs.readdir(pathToExamples, (err, files) => {
        files = files
            .filter(f => !/\-/.test(f))
            .filter(f => /\.js$/.test(f))
            .map(f => { return { name: path.parse(f).name, path: path.join(pathToExamples, f) } })

        files.forEach(fileDesc => {
            const prop = `talk_${fileDesc.name}`

            if (Reflect.has(repl.context, prop)) return

            Reflect.defineProperty(repl.context, prop, {
                get: () => {
                    return echoAndRunFile(fileDesc.name)
                }
            })

        })

    })

}
