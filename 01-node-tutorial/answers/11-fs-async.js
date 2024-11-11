const { writeFile, readFileSync } = require('fs')

const path = './temporary/fileB.txt'
console.log('at start')

writeFile(path, 'This is line 1\n', (err) => {
    console.log('at point 1')
    if (err) {
        console.log('Error writing line 1:', err)
        return
    }
    writeFile(path, 'This is line 2\n', { flag: 'a' }, (err) => {
        console.log('at point 2')
        if (err) {
            console.error('Error writing line 2:', err)
            return
        }
        writeFile(path, 'This is line 3\n', { flag: 'a' }, (err) => {
            console.log('at point 3')
            if (err) {
                console.error('Error writing line 3:', err)
                return
            }
            console.log('All lines written successfully.')
        })
    })
})
console.log('at end')

let readResult = readFileSync(path, "utf8");
console.log(readResult);