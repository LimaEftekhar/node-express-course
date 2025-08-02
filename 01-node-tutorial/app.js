// console.log('Welcome to Node Tutorial')

const http = require ('http')
const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end("Welcome to the home page")
    }
    else if(req.url === '/services'){
        res.end("Welcome to the services page")
    } else{

    res.end(
        `<h1>Ooops! the page you are looking for does not exist.</h1></b>
        <a href = "/">HomePage</a>`
    )}

})

server.listen(300)


