const { writeFile, readFile } = require("fs").promises;

const path = './temporary/temp.txt';

const writer = async () => {
    try{
    await writeFile(path, 'First line. \n');
    await writeFile(path, 'Second line. \n', { flag: 'a' });
    await writeFile(path, 'Third line. \n', { flag: 'a' });
    }catch(err){
        console.log('Error writing to file', err);
    }
}
//writer();

const reader = async () => {
    try{
        const content = await readFile(path, 'utf-8');
        console.log(content);
    }catch (err) {
        console.log('Error reading file', err);
    }
}
//reader();

const readWrite = async () => {
    await writer();
    await reader()
}

readWrite();