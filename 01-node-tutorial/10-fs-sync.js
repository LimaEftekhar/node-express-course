const { readFileSync, writeFileSync } = require('fs')
// console.log('start')
// const first = readFileSync('./content/first.txt', 'utf8')
// const second = readFileSync('./content/second.txt', 'utf8')

// writeFileSync(
//   './content/result-sync.txt',
//   `Here is the result : ${first}, ${second}`,
//   { flag: 'a' }
// )
// console.log('done with this task')
// console.log('starting the next one')

writeFileSync('./temporary/fileA.txt', 'first line\n')
writeFileSync('./temporary/fileA.txt', 'second line\n', {flag: 'a'})
writeFileSync('./temporary/fileA.txt', 'third line\n', {flag: 'a'})

const files = readFileSync('./temporary/fileA.txt', 'utf8')
console.log(files)