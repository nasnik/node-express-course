const { writeFile, readFile } = require("fs").promises;

const path = './temporary/temp.txt';

writeFile(path, 'First line with cascading. \n') // write line 1
    .then(() => {
        return writeFile(path, 'Second line with cascading. \n', {flag: 'a'})  // write line 2.
        // Return the promise so you can chain the .then statements
    })
    .then(()=> {
        return writeFile(path, 'Third line with cascading. \n', {flag: 'a'})
    }) // write the third line, and follow that with two more .then blocks,
// one to call readFile to read it back out, and one to log the data to the screen.
    .then(()=>{
        return readFile(path, 'utf-8')
    })
    .then((data)=>{
        console.log('File content: ', data)
    })
    .catch((error) => {
    console.log("An error occurred: ", error)
})