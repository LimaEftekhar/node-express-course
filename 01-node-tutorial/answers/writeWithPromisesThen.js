const { writeFile } = require("fs").promises;
console.log("First Example")
writeFile('temp.txt', 'First Example\n', {flag: 'a'})
.then(()=>{
    console.log("Second Example")
    return writeFile('temp.txt', 'Second Example\n', {flag: 'a'})
})
.then(()=>{
    console.log("Third Example")
    return writeFile('temp.txt', 'Third Example\n', {flag: 'a'})
})
.catch((error)=>{
    console.log("An error occurred: ", error)  
})


