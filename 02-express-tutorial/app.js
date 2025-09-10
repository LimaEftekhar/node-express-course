console.log("Express Tutorial");

const express = require("express");
const http = require("http");
const { products, people } = require("./data");

const app = express();
const server = http.createServer(app);

// load index.html from public folder using express.static
app.use(express.static("./public"));

//request data from server
app.get('/api/v1/test', (req, res) =>{
  res.json({ message: "It worked!" })
})

//retrive products from data.js
app.get('/api/v1/products', (req, res) => {
  res.json(products)
})

//reterive products by id
app.get('/api/v1/products/:productID', (req, res)=>{
  const idToFind = parseInt(req.params.productID)
  const product = products.find((p) =>p.id === idToFind)

  if (product){
    res.json(product)
  }else{
    res.status(404).json({message: "That product was not found."})
  }
})

app.get('/api/v1/query', (req, res)=>{
  let sortedProducts = [...products]
  const{search, limit, regex, maxPrice} = req.query

  //simple search, filter the product
  if(search){
    sortedProducts = sortedProducts.filter(product=>
      product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  }

  //regex search or regular expresion search. filter the product
  if(regex){
    const reg = new RegExp(regex, 'i')
    sortedProducts = sortedProducts.filter(p => reg.test(p.name))
  }
//slice or limit result
  if(limit){
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  //price filter
  if(maxPrice){
    sortedProducts = sortedProducts.filter(p => p.price < Number(maxPrice))
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ message: "No products matched your search"});
  }

  res.status(200).json(sortedProducts);
})

//retrive users from data.js
app.get('/api/v1/people', (req, res)=>{
  res.json(people)
})
//404 error for page not found
app.all('*', (req, res) => {
    res.status(404).json({error: 'Not found', message: 'The page does not exist'})
})

//server is listening to port 3000
server.listen(3000, () => {
  console.log("server is ruing por 3000");
});
