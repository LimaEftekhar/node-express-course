console.log("Express Tutorial");

const express = require("express");
const http = require("http");
const { products } = require("./data");
const peopleRouter = require("./routes/people");
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

app.use(logger);

// AUTH middleware
const auth = (req, res, next) => {
  if (req.cookies.name) {
    // if cookie exists then attach user to request 
    req.user = req.cookies.name;
    next();
  } else {
    // if no cookie exist then unauthorized user
    res.status(401).json({ success: false, message: 'unauthorized' });
  }
};

app.use(express.static("./methods-public"));

// test endpoint, request data from server
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//products route, retrive products from data.js
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

//reterive products by id
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found." });
  }
});

app.get("/api/v1/query", (req, res) => {
  let sortedProducts = [...products];
  const { search, limit, regex, maxPrice } = req.query;

  //simple search, filter the product
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  //regex search or regular expresion search. filter the product
  if (regex) {
    const reg = new RegExp(regex, "i");
    sortedProducts = sortedProducts.filter((p) => reg.test(p.name));
  }

  //slice or limit result
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  //price filter
  if (maxPrice) {
    sortedProducts = sortedProducts.filter((p) => p.price < Number(maxPrice));
  }

  if (sortedProducts.length < 1) {
    return res
      .status(200)
      .json({ message: "No products matched your search" });
  }

  res.status(200).json(sortedProducts);
});

// people routes moved to router
app.use("/api/v1/people", peopleRouter);

// POST /login
app.post('/login', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Please provide a name' });
  }

  // set cookie
  res.cookie('name', name, { httpOnly: true });
  res.status(201).json({ success: true, message: `Hello, ${name}` });
});

// DELETE /logoff
app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ success: true, message: 'User logged off' });
});

// GET /test (protected)
app.get('/test', auth, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome, ${req.user}` });
});

// 404 handler, 404 error for page not found
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ error: "Not found", message: "The page does not exist" });
});

//start server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
