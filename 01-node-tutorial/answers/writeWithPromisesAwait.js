const { writeFile, readFile } = require("fs").promises;

async function writer() {
    try{
        await writeFile('temp.txt','First line\n' )
        await writeFile('temp.txt','Second line\n', {flag: 'a'})
        await writeFile('temp.txt','Third line\n', {flag: 'a'})
    }
    catch (err) {
        console.log('Error:', err)
    }
}

async function reader() {
    try{
        const content = await readFile('./temp.txt', 'utf8')
        console.log(content)
    }
    catch (err){
        console.log('Error:', err)
    }
}

async function readWrite() {
    await writer()
    await reader()
}

readWrite()