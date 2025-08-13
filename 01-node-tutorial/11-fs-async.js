// const { readFile, writeFile } = require('fs')

// console.log('start')
// readFile('./content/first.txt', 'utf8', (err, result) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   const first = result
//   readFile('./content/second.txt', 'utf8', (err, result) => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     const second = result
//     writeFile(
//       './content/result-async.txt',
//       `Here is the result : ${first}, ${second}`,
//       (err, result) => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         console.log('done with this task')
//       }
//     )
//   })
// })
// console.log('starting next task')
const {writeFile } = require('fs')
console.log("at start")

writeFile("./temporary/output.txt", "This is line 1\n", (err, result) =>{
  console.log("at point 1")
  if(err){
    console.log("This 1st error happend", err)
  } else{
    console.log("This is the 1st result ")
  }
})
  writeFile("./temporary/output.txt", "This is line 2\n", {flag: "a"}, (err, result) =>{
    console.log("at point 2")
    if(err){
      console.log("This is the 2nd error happend", err)
    } else{
      console.log("This is the 2nd result")
    }
  })

  writeFile("./temporary/output.txt", "This is 3rd line\n", {flag: "a"}, (err, result) =>{
    console.log("at 3rd point")
    if(err){
      console.log("This is the 3rd err: ", err)
    } 
    else{
      console.log("This is the 3rd result")
    }
    
  })
  console.log("at end");
  

