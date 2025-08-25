const { createReadStream } = require('fs')

const stream = createReadStream('.././content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200
})

let counter = 0

stream.on('data', chunk => {
  counter++
  console.log(`Chunk #${counter}:\n${chunk}`)
})

stream.on('end', () => {
  console.log(`Total chunks received: ${counter}`)
})

stream.on('error', err => console.error(err))