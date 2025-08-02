// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

//print current directory path
console.log(__dirname)
// this print "Hi there" the environment variable
console.log(process.env.MY_VAR)
// this print file name
console.log(__filename)
setInterval(() => {
  console.log('hello world')
}, 1000)


